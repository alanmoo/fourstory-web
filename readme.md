#FourStory

I've been using FourSquare/Swarm for years now, and rather frequently I find myself wanting to figure out what the name of a place I went to was, or when I was there. Swarm offers this functionality to an extent, but not the way I want to sort through the data.

I've also wanted to play around with ES6 syntax using Babel, so here I am.

This is very much a work in progress and continual evolution. It's not hosted anywhere yet, but feel free to poke around the code.

A (not-very-functional yet) demo is up at [http://fourstory.alanmooiman.com]. It's only been tested in the newest version of Chrome right now, as IndexedDB support isn't that great (though it should work in Firefox)

##Planned functionality

* Fetch user's checkin history and store locally for fast access(IndexedDB? Notwithstanding iOS bugginess? Probably too much data for localStorage to be appropriate)
* Allow user to search history by date range, location on a map, ...?

##Todo (partial list)

Get out of the global scope (ES6 modules)
Store history locally
