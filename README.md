# Gym Log

A phone-friendly tracker for Workout A (machines) and running. It works offline, keeps your log on the phone, and can sync across devices behind a login.

Everything is plain files: `index.html` is the whole app.

## 1. Put it online (GitHub Pages)

1. Open the repo on GitHub, then **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
3. After a minute the site is live at `https://<your-username>.github.io/gym-log/`.

GitHub Free only serves Pages from **public** repos. That is fine here: the repo holds code only, and your data is never stored in it.

On your iPhone, open the site in **Safari**, tap **Share**, then **Add to Home Screen**. It opens full screen with its own icon.

## 2. Switch on sync (optional, free)

Without this the app still works, and data stays on the phone.

1. Go to <https://console.firebase.google.com> and **Create a project** (no Analytics needed).
2. **Build > Authentication > Get started > Sign-in method**: enable **Email/Password**.
3. **Authentication > Users > Add user**: add your email and a password. This is your login.
4. **Authentication > Settings > User actions**: untick **Enable create (sign-up)** so nobody else can make an account.
5. **Build > Firestore Database > Create database**. Pick a European region (for example `europe-west2`) and **production mode**.
6. In Firestore, open the **Rules** tab, paste the contents of `firestore.rules` from this repo, then **Publish**.
7. **Project settings (cog) > General > Your apps > Web (`</>`)**: register an app, copy the `firebaseConfig` values.
8. Paste them into `firebase-config.js` as `window.FIREBASE_CONFIG = { ... }`, commit, and wait for Pages to redeploy.
9. In the app, open **Account**, sign in, and your data starts syncing. Sign in on any other device to see the same log.

## Moving data across

Use **Account > Backup**. **Copy backup** on one device, then paste it into **Import** on the other. Importing never overwrites anything, it only adds what is missing.

## Notes

- Photos are shrunk and stored with your data.
- Runs: distance, time, type, how it felt, notes. Pace is worked out for you. The pace chart has a dashed line at the pace needed for a sub 2:15 half marathon.
- To change the routine, edit the `EX` list near the top of the script in `index.html`.
