# Zikri

Voice-first reminders, notes, and calendar for English, Amharic, and Tigrinya. Built with Expo/React Native and Supabase for iOS and Android.

## Run locally

1. Copy `.env.example` to `.env` and add the Supabase publishable key.
2. Run `npm install` and then `npm start`.
3. Open with Expo Go or use `npx expo run:android` / `npx expo run:ios`.

The starter includes multilingual UI, reminder completion, calendar and notes views, notification scheduling, spoken confirmation, and a transcript-based voice flow ready for a production speech-to-text provider.

## Important next steps

- Add Supabase Auth onboarding and persist reminders/notes.
- Connect native speech recognition and test Amharic/Tigrinya accuracy on real devices.
- Create the Expo EAS project and signing credentials.
- Add privacy policy, store artwork, screenshots, and store listings.
