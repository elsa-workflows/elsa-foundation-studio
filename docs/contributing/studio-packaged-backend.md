# Use a packaged Workbench backend

This optional path runs Studio from source and connects it to a published Elsa Workbench image. The verified pair was Studio commit `7cb2f2c2381411694c470cdb9179402571bcf832` and Workbench source revision `592d6c0eb2a1ae45563ce5b234fb4e97af2867ed`, pinned to immutable image index `elsaworkflows/elsa-workbench@sha256:73ef26e41760eaa4618a37cfbd7285002408f634e4089201b3864cb1f6147904` (preview `4.0.0-preview.1115`). The tested platform was macOS arm64 using the Linux/arm64 image manifest. This result is specific to this source pair and tested platform.

Follow the prerequisites in [Make a visible Studio source edit](studio-source-quickstart.md), using a disposable clone so existing work stays untouched. Switch that clone to the verified commit before installing or editing:

```bash
git clone https://github.com/elsa-workflows/elsa-foundation-studio.git elsa-foundation-studio-contributor
cd elsa-foundation-studio-contributor
git switch -c contributor-reference 7cb2f2c2381411694c470cdb9179402571bcf832
node --version
pnpm --version
dotnet --version
pnpm install --frozen-lockfile
pnpm build
dotnet build src/apps/Elsa.Studio.Web/Elsa.Studio.Web.csproj
```

You also need Docker running locally. Use the Development/SQLite configuration in Foundation’s [Docker Hub quickstart](https://github.com/elsa-workflows/elsa-foundation/blob/main/docs/docker-hub-quickstart.md). It documents the local Development seed `admin` / `Password123!`; do not use that seed outside a local Development host. Check Docker with `docker info` and inspect ports with `lsof -nP -iTCP:5089 -iTCP:5095 -sTCP:LISTEN`. If either port is occupied, stop here and wait until it is free; do not stop another session’s listener. This walkthrough uses the fixed Studio HTTP profile on port 5089.

The following creates a uniquely named container and fresh data/packages volumes for this run. The data volume stores the Data Protection SQLite file. Workbench workflow SQLite files remain in the container’s writable layer; the packages volume stores the Nuplane directory feed. Reusing a container or volumes is outside this disposable walkthrough. Run each setup command only after the previous one succeeds. If pulling, creating a volume, or starting the container fails, stop setup; preserve the error and remove only the resources whose creation succeeded, using their recorded names below. Do not continue to Studio after a setup failure.

```bash
run_id="$(date -u +%Y%m%dT%H%M%SZ)-$(uuidgen | tr -d '-' | cut -c1-8)"
name="contributor-demo-$run_id"
data_volume="$name-data"
packages_volume="$name-packages"
image='elsaworkflows/elsa-workbench@sha256:73ef26e41760eaa4618a37cfbd7285002408f634e4089201b3864cb1f6147904'

docker pull --platform linux/arm64 "$image"
docker volume create "$data_volume"
docker volume create "$packages_volume"
docker volume inspect "$data_volume" "$packages_volume" --format '{{.Name}} {{.Mountpoint}}'

cid="$(docker run --detach --platform linux/arm64 --cpus 2 \
  --name "$name" \
  --publish 127.0.0.1:5095:8080 \
  --env ASPNETCORE_ENVIRONMENT=Development \
  --env Elsa__ModuleManagement__ApiKey=elsa-docker-demo-key \
  --env Cors__AllowedOrigins__0=http://localhost:5089 \
  --env CShells__Shells__default__Features__FoundationIdentityAspNetCoreIdentity__AllowedReturnUrlOrigins__0=http://localhost:5089 \
  --env Elsa__DataProtection__EntityFrameworkCore__Enabled=true \
  --env 'Elsa__DataProtection__EntityFrameworkCore__ConnectionString=Data Source=/app/data/data-protection.db' \
  --mount "type=volume,src=$packages_volume,dst=/app/packages" \
  --mount "type=volume,src=$data_volume,dst=/app/data" \
  "$image")"
printf 'Workbench container: %s (%s)\n' "$name" "$cid"

ready=0
for attempt in $(seq 1 60); do
  if curl --silent --fail --max-time 5 --output /dev/null http://localhost:5095/health/ready; then
    ready=1
    break
  fi
  sleep 2
done
if [ "$ready" -eq 1 ]; then
  curl --fail --show-error http://localhost:5095/health/ready
else
  docker logs "$cid"
  docker stop "$cid"
  docker rm "$cid"
  docker volume rm "$data_volume" "$packages_volume"
  printf 'Workbench did not become ready; this run was cleaned up. Inspect the logs before retrying.\n'
  false
fi
```

Continue only after readiness succeeds. Keep the backend terminal open so its container and volume variables remain available for cleanup. In a second terminal, start Studio from the clone root. The two Studio settings must match the backend address and its local module-management key:

```bash
Studio__BackendBaseUrl=http://localhost:5095 \
Studio__BackendModuleManagementApiKey=elsa-docker-demo-key \
dotnet run --no-build --project src/apps/Elsa.Studio.Web/Elsa.Studio.Web.csproj --launch-profile http
```

Open `http://localhost:5089` and sign in with the Development seed. Keep Studio on this origin because the backend CORS and login return-origin settings name it. No Data Protection certificate is configured here, so this setup makes no encryption-at-rest claim. When finished, stop only the Studio process you started with Ctrl+C in its terminal.

Now follow [Exercise a visible edit](studio-source-quickstart.md#exercise-a-visible-edit) and [Run a workflow in the browser](studio-source-quickstart.md#run-a-workflow-in-the-browser). Use the packaged Workbench in place of the source-built backend. To confirm the workflow’s expected stdout, run `docker logs "$cid"` in the backend terminal.

When finished, stop your Studio host with Ctrl+C in its terminal. In the backend terminal, stop only the container you started and remove its two disposable volumes by their recorded names:

```bash
docker stop "$cid"
docker rm "$cid"
docker volume rm "$data_volume" "$packages_volume"
```

## Verified result and recovery

The candidate image completed a browser journey: the published Flowchart run and its Write Line activity completed with no active incidents; stdout was `Hello from the packaged contributor journey 585`. Dashboard Attention still reported incomplete workflow runtime data. Studio’s Dashboard edit loop was also verified: changing the existing test expectation first produced one intended failure among 20 package tests; changing the heading then made all 20 pass. After rebuilding the module and Studio host and restarting Studio, the browser showed the edit. Restoring the two files returned their original hashes; package tests, typecheck, and module build passed, and after the host rebuild/restart the browser showed `Dashboard` again. This verifies rebuild/restart, not hot reload.

One older image, preview `4.0.0-preview.1085` (`sha-edffd0a`, source `edffd0a4ea18a17c4faa2c3f8ce073f48bc09af6`, digest `sha256:d7c7d1886dcce5277c3028ac82dceb8385f078c7a5da13f50e76aae751ac5656`), authenticated successfully but did not advertise `workflow-instances-health-filter`. Opening `/workflows/instances?incidentHealth=active` showed Studio’s unsupported-current-incident-health message and loaded no runs; clearing filters returned the empty unfiltered list. This was one missing capability, not evidence of general version incompatibility.

With the candidate image in a new container and new volumes, that capability was present and the same active-incident filter returned zero matching runs without the unsupported message. A newly created, published recovery workflow ran to completion with no active incidents and stdout `Hello from the recovered contributor journey 585`. This verifies a disposable fresh-data recovery only; it does not verify upgrading or migrating the older container’s data. The walkthrough and evidence are tracked in [Studio issue #585](https://github.com/elsa-workflows/elsa-foundation-studio/issues/585).

Verification reused an existing pnpm store (742 packages, no downloads), Corepack cache and possibly shared Docker base layers. The candidate image was confirmed absent before its pull; the older-image pull reused shared layers and downloaded additional layers. The candidate selected Linux/arm64 manifest `sha256:a14b221e28e055539da6280e716a1f37798c2f1bf74bedfa3e76e9cb159ee994`. Node 22.22.1, pnpm 11.9.0 and .NET SDK 10.0.300 were used. Vite builds emitted warnings; Dashboard Attention still reported incomplete workflow runtime data, and intentional host restarts produced console connection errors. The workflow and source-edit results do not imply every optional panel is healthy. An unfamiliar human contributor trial remains outstanding.
