StackOverflow Steroids
======================

Improved [StackOverflow](http://stackoverflow.com/) UX and usability!

Download from Chrome Store: https://chrome.google.com/webstore/detail/stackoverflow-steroids/hmpehldkjbnpdhebfangeaoabhphihic





How to introduce new features and improvements
----------------------------------------------

###Improve current features (`CSS`)

1. In `popup.html` or using the inspector on the popup of the extension, find the `id` of the `<label>` associated to the feature that you want to modify. It will look something like `navbar-cb` and all of them end in `-cb`.

2. Edit `steroids.css` as desired, but taking care to:
  1. Always prefix new `CSS` selectors and put them in separated lines. For the previous example, a new selector will look something like `body.sos-navbar.sos-another-feature-id #rest-of-your > .selectors`.
    
    There are just a few exceptional selectors that are not prefixed as they introduce very subtle changes.

  2. There are a few comments that group `CSS` blocks for the same feature, like `/* TOP NAVBAR ///...///*/`. Try to find the appropriated place for yours or create a new one.






###Improve current features (`JS`)

1. In `popup.html` or using the inspector on the popup of the extension, find the `id` of the `<label>` associated to the feature that you want to modify. It will look something like `scroll-cb` and all of them end in `-cb`.

2. In `content-sript.js` there is a function `updateInjection()` whose first line looks like: `chrome.storage.sync.get(["global-cb", ...], function(res) { ... });`. There should be an `if`-`else` block for the feature you are looking for, for example `if(res["scroll-cb"]){ ... } else { ... }`.
 
  1. The `if` part introduces changes, normally using event listeners, so if you want to edit a current feature you would probably need to check the event listener `function`.

    You can see that the property is being deleted from the `res` `object` in the first line of the `if` block. This is because this feature only introduces `JS` code. If it injected `CSS` too, it should **NOT** be deleted. Otherwise, the associated `CSS` would not be applied.

  2. The `else` part removes those changes, so that if the user disables the associated feature, it won't be necessary to reload the existing pages for them to be disabled.

    In both cases a `try`-`catch` block is needed just in case the current feature only affects elements present in some of the pages targeted by the extension.





###Introduce new features (`CSS`)

1. In `popup.html`, you should add a new entry in the appropriated place. Just take a look to the current code to see what you need to copy and where to paste it. You can also create a new section if needed. Then, change the `id` of the `<label>` associated to the entry that you have created and change its title and description. It will look something like `feature-cb` and all of them must end in `-cb`.

2. Edit `steroids.css` as desired, but taking care to:
  1. Always prefix new `CSS` selectors and put them in separated lines. For the previous example, a new selector will look something like `body.sos-feature.sos-another-feature-id #rest-of-your > .selectors`.
    
    There are just a few exceptional selectors that are not prefixed as they introduce very subtle changes.

  2. There are a few comments that group `CSS` blocks for the same feature, like `/* TOP NAVBAR ///...///*/`. Try to find the appropriated place for yours or create a new one.





###Introduce new features (`JS`)

1. In `popup.html`, you should add a new entry in the appropriated place. Just take a look to the current code to see what you need to copy and where to paste it. You can also create a new section if needed. Then, change the `id` of the `<label>` associated to the entry that you have created and change its title and description. It will look something like `feature-cb` and all of them must end in `-cb`.

2. In `content-sript.js` there is a function `updateInjection()` whose first line looks like: `chrome.storage.sync.get(["global-cb", ...], function(res) { ... });`. You need to add the `id` of your new feature in that `Array`. 

3. Inside the callback, you should add an `if`-`else` block for the new feature, for example `if(res["feature-cb"]){ ... } else { ... }`.
 
  1. The `if` part introduces changes, normally using event listeners, so you better create a new `function` outside the callback and bind the events from here.

    If your feature only introduces `JS` code, delete your property from the `res` `object` in the first line of the `if` block. If it injected `CSS` too, it should **NOT** be deleted. Otherwise, the associated `CSS` would not be applied.

  2. The `else` must remove those changes, so that if the user disables the associated feature, it won't be necessary to reload the existing pages for them to be disabled.

    In both cases a `try`-`catch` block is needed just in case the current feature only affects elements present in some of the pages targeted by the extension.





###Target new pages

To target new pages, a new rule must be added to the `matches` properties of the `manifest` (inside `content_scripts`).





TO-DO
-----

 - [ ] Open links in questions and answers in new tabs.
 - [ ] Add hidden editor features, as `<kbd>Key</kbd>` that shows up as <kbd>Key</kbd>, in the editor toolbar and in the editor help.
 - [ ] Auto-resize editor instead of using scrollbars.
 - [ ] Fix the editor toolbar to the top of the page (after the menu if it is fixed-positioned too) when we scroll down to avoid being constantly scrolling up and down if we prefer to use the toolbar instead of the syntax.
 - [ ] Make <kbd>Tab</kbd> key write 4 spaces and <kbd>Shift</kbd> + <kbd>Tab</kbd> remove them.





Author and License
------------------

Copyright (c) 2015 Dani Gámez Franco

Check my website for more details: http://gmzcodes.com

Licensed under the [MIT license](LICENSE).
