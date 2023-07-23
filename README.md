# Mythic Companion (mythiccompanion)

A companion for use with Word Mill Game's "Mythic GM Emulator 2E" by Tana Pigeon. This app is an unofficial fan project- stand by for an official app "soon" according to Tana.

## Using the Webapp:

### Adding/Selecting A Campaign

Click the menu in the upper left to open the campaign drawer.

You can add additional campaigns by clicking "New Campaign" to create a campaign initially called "Campaign Name". You can delete campaigns only if you have multiple- click the trash icon to the right of the campaign name. THIS ACTION CANNOT BE UNDONE.

To mark a campaign as the active campaign, click on it's name.

Return to the app by clicking. You may also drag to close the drawer.

### Managing the Campaign and Characters (Campaign Tab)

On the campaign tab, you can name the campaign, and add characters which have a name, description, and additional notes. The topmost character is consdiered the lead, and the list may be reorganized by clicking and dragging. If you have multiple characters, you may delete one by clicking the trash icon to the right of their name.

### Using the Meaning Tables (Meaning Table Tab)

The primary meaning tables (Action 1/Action 2 and Descriptor 1/Descriptor 2) can be rolled on this tab. The tab defaults to the Action tables- you can use the "Swap" button to toggle between them.

Click "Roll" to roll random results which are displayed at the top of the screen. You can use the "Journal" button to copy this result to the current journal entry if you choose.

If you dislike the results, the highlight over the chosen action may be dragged to another entry on that table. Alternatively, you can "Clear" the latest result and unset the roll.

### Jouraling Scenes and Managing the Chaos Factor (Journal Tab)

In the Journal tab, you can record details of your scenes. Each entry is initially collapsed, showing only the title. You can expand to see and edit the body of the entry by clicking the arrow on the far right of the title.

If you send a result from the meaning table here, it will be recorded similar to "\[\[Action 3/1: Activate Advantage]]" on a new line.

To add a new entry, use the buttons on the top left to determine if the Chaos Factor ought to increase, stay the same, or decrease. Chaos Factor is automatically bound between the values of 1 and 9.

If you delete an entry, it will NOT affect the Chaos Factor! The entry numbering will automatically adjust, leaving no blanks.

## Working with the project:

### Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
