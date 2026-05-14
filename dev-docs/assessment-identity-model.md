# Assessment Identity Model

Status: active
Created: 2026-05-14
Scope: public assessment funnel

## Centerline

Keep public assessment identity lightweight until there is a real account/app
reason to add authentication.

## Handles

```text
local_key
  human-readable browser key
  stored only in localStorage
  labels the local assessment index
  not sent in project URLs
  not authentication

uid
  anonymous browser/device id
  stored in localStorage
  implementation handle for the local index

pid
  stable project/thread id
  safe to email, bookmark, or share as a project link
  opens one project thread

aid
  one completed assessment run inside a pid
```

## Product Rule

`/assessments/` may show all projects remembered by the current browser.

`/assessments/?pid=...` opens one project thread and must not require the local
key.

If browser storage is cleared, the local index disappears. Individual project
links still open their project threads.

## Defer

Do not add account authentication or a server-side cross-project retrieval flow
until the product needs portable identity.

Future account claim can map:

```text
lead/email -> many pids
user/account -> claimed pids
pid -> many aids
```
