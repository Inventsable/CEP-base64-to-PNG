# base64 > PNG conversion in CEP

[Made by request to demonstrate how to convert from base64 to PNG in the Illustrator forum.](https://community.adobe.com/t5/illustrator-discussions/illustrator-script-to-convert-the-base64-into-image/td-p/12832169)

As a bare minimum you must have nodeJS enabled in your manifest:

```html
<CEFCommandLine>
  <Parameter>--enable-nodejs</Parameter>
</CEFCommandLine>
```

Inside [App.vue](https://github.com/Inventsable/CEP-base64-to-PNG/blob/master/src/App.vue) you can see the proof of concept:

```js
async tryDownload() {
    let result = await convertBase64ToPNG(
        this.b64Str,
        this.fileName,
        this.destination
    );
    if (result.okay) {
        console.log("Written successfully");
    } else {
        console.error(result.error);
    }
},
```

The logic itself and a few extras are contained in [./src/utils/convertBase64.js](https://github.com/Inventsable/CEP-base64-to-PNG/blob/master/src/utils/convertBase64.js). Usage is easy and code is annotated with JSDoc above the function for clarity on arguments:

```js
// You must import/require the function:
import { convertBase64ToPNG } from "./convertBase64";
```

```js
// Then use async/await:
let result = await convertBase64ToPNG(
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC",
  "test.png",
  "C:/Users/TRSch/OneDrive/Desktop"
);
if (result.okay) console.log("Successful");
else console.error(result.error);

// Or thenable syntax:
convertBase64ToPNG(
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC",
  "test.png",
  "C:/Users/TRSch/OneDrive/Desktop"
).then((result) => {
  if (result.okay) console.log("Successful");
  else console.error(result.error);
});
```

---

## Running this panel

This panel is created from the [Bombino](https://github.com/Inventsable/bombino) generator and is currently in developer context. To use it, download it to a valid CEP folder, then use `npm run serve` and relaunch Illustrator. For more info about the setup and additional commands, visit the parent bombino repo.
