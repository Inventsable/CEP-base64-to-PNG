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

## Example

```js
let result = await convertBase64ToPNG(
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
  "test.png",
  "C:/Users/TRSch/OneDrive/Desktop"
);
if (result.okay) console.log("Successful");
else console.error(result.error);
```

Produces a valid PNG at `C:/Users/TRSch/OneDrive/Desktop/test.png`:

![](./result.png)

---

## Running this panel

This panel is created from the [Bombino](https://github.com/Inventsable/bombino) generator and is currently in developer context. To use it, download it to a valid CEP folder, then use `npm run serve` and relaunch Illustrator. For more info about the setup and additional commands, visit the parent bombino repo.

```js
// Must include CSInterface.js as a preloaded script in your HTML:
// https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/CSInterface.js
// The below must be run after CSInterface.js is loaded, like in the custom logic / <body> tag
let CSI = new CSInterface();
CSI.addEventListener("myScriptMessage", (msg) => {
  if (msg.data && msg.data !== "undefined") alert(msg.data);
});
```

```js
function JSXEvent(payload, eventType) {
  try {
    var xLib = new ExternalObject("lib:PlugPlugExternalObject");
  } catch (e) {}
  if (xLib) {
    var eventObj = new CSXSEvent();
    eventObj.type = eventType;
    eventObj.data = payload;
    eventObj.dispatch();
  }
  return;
}

// And then to send some data to our CEP panel:
JSXEvent("Hello world from JSX", "myScriptMessage");
```
