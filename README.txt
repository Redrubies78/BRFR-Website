BLUE RIDGE FARMHOUSE RETREAT - DIRECT BOOKING WEBSITE
=====================================================

The "site" folder is the whole website. It is the folder you upload to Cloudflare Pages.

Full step-by-step instructions are in the "BRFR Direct Booking Website - Launch Guide" doc in Claude.

Quick version:
 1. In OwnerRez, go to Settings > My Website > Widgets and create 3 widgets:
    Book Now/Inquiry, Multi-Month Calendar and Reviews, all for Blue Ridge Farmhouse Retreat.
 2. Open site/index.html in a plain text editor and search for "PASTE YOUR OWNERREZ".
    Replace each dashed placeholder line with the matching widget code.
 3. In Cloudflare, go to Workers & Pages > Create application > Pages > Drag and drop your files.
    Drag in the "site" folder, then click Deploy.
 4. In the Pages project, open Custom domains and add blueridgefarmhouseretreat.com
    and www.blueridgefarmhouseretreat.com.

Seasonal hero photos are in site/images/hero/ (spring.jpg, summer.jpg, fall.jpg, winter.jpg).
To swap one, replace the file with one that has the same name and re-upload.
To preview a season, add ?season=winter (or spring, summer, fall) to the end of the web address.
