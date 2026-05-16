# User Onboarding & Profile Management

A small but complete onboarding flow built with React, Redux Toolkit, and TypeScript. It covers signup, a protected profile page, and a few things I found interesting to implement — like the email autofill and the credit card masking.

---

## What it does

- **Signup** — standard form with first name, last name, email, and password. Validation is handled with React Hook Form so there's no messy manual state.
- **Email autofill** — when you tab out of the email field, it hits the JSONPlaceholder API and checks if that email exists. If it does, the name fields get prefilled automatically. API response is cached in Redux so it only fetches once per session.
- **Protected profile route** — you can't reach `/profile` without signing up first. If you're already logged in, going back to `/` redirects you straight to the profile page.
- **Profile form** — gender, date of birth, masked credit card input, and a married toggle that conditionally shows a children field. Full name and email are read-only since they come from signup.
- **Persistence** — both auth and profile are saved to `localStorage`, so refreshing the page doesn't log you out or wipe the form.

---

## Tech used

- React 19 + TypeScript
- Vite
- Redux Toolkit (`authSlice` + `profileSlice`) with typed `useAppDispatch` / `useAppSelector` hooks
- React Hook Form
- Axios
- Tailwind CSS v4
- React Router v7

---

## Running it locally

You just need Node installed (anything v18+ works fine).

```bash
# 1. clone and go into the folder
git clone <repo-url>
cd taskts

# 2. install deps
npm install

# 3. start the dev server
npm run dev
```

App will be at **http://localhost:5173**.

---

## Try the autofill feature

The email autofill pulls from [JSONPlaceholder's users list](https://jsonplaceholder.typicode.com/users). These emails will trigger the name prefill on the signup page:

| Email | Name that gets prefilled |
|---|---|
| Sincere@april.biz | Leanne Graham |
| Shanna@melissa.tv | Ervin Howell |
| Nathan@yesenia.net | Clementine Bauch |
| Julianne.OConner@kory.org | Patricia Lebsack |
| Lucio_Hettinger@annie.ca | Chelsey Dietrich |

Any other email will just sign up normally with the name you typed.

## Project Structure

```
src/
├── App/
│   ├── App.tsx              # Root component; restores auth/profile from localStorage
│   ├── store.ts             # Redux store with RootState & AppDispatch exports
│   └── slices/
│       ├── authSlice.tsx    # isAuthenticated, user, userRecordCache
│       └── profileSlice.tsx # gender, dob, creditCard, married, children
├── components/
│   ├── Input.tsx            # Reusable form input with error display
│   ├── Navbar.tsx           # Navbar with user info & logout
│   └── ProtectedRoutes.tsx  # Redirects unauthenticated users to /
├── hooks/
│   ├── useAuth.tsx          # handleSignup, handleLogout, checkEmail
│   └── useTypedHooks.ts     # useAppDispatch & useAppSelector (typed)
├── pages/
│   ├── Signup.tsx           # Signup form with React Hook Form validation
│   └── Profile.tsx          # Profile form saved to Redux + localStorage
└── types/
    ├── authType.ts          # Form type for signup fields
    └── profileType.ts       # ProfileForm type
```

## Notes

- Try email `Sincere@april.biz` on the signup page — it will prefill the name from JSONPlaceholder.
- Credit card input is masked by default; click the eye icon to reveal digits.
- The "Number of Children" field only appears when **Married** is set to **Yes**.
