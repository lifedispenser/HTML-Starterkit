**NOTE: Prototype kit is not really usable yet. Sorry!**

## Prototype kit

A set of scripts, components, and modules to do rapid prototyping of workflows.

### Intro

In the vast world of prototyping tools, including paper, sketch, invision, oragami, and more, prototype kit is optimized for **exploring workflows**. It gives the bare bones needed to quickly build HTML/CSS pages that mimic the expected behavior of the real app.

Prototype-kit aims to have the same fidelity as paper prototypes. Both are meant to be used when the idea is still forming to quickly discover issues and and test multiple solutions. Whereas paper prototype helps you quickly explore the components of each page and how they will work, Prototype-kit aims to explore user choices - the input and selections of different options that lead to various results.

Prototype-kit's goal is to be as **quick as paper prototypes to build** but still have it **correctly simulate use**, like link clicks and form submissions. It also aims to provide a framework for testers to explore scenario options with narration and navigational tools. Think Invision but more powerful and much quicker to build things for.  

### How to install

* clone the repo
* npm install && bower install
* gulp watch

### Helper modules and documentation on how to use:

**Note: Work in Progress. Not all of these have been implemented.**

#### Narration:

The narration block is a styled modal that explains a page or the context for how you arrived at the page. This is useful to describe a scenario where the app initiates with the user (after 5 days pass, you receive this email asking you to do this). 

The narration block is absolutely positioned and doesn't mess with your layout. It is shown when the page loads, but hides once the page scrolls or anything is clicked out, with the option of opening it again. 

#### Navigation:

Prototype kit assumes a convention of numbered pages. For linear workflows, PK looks for html pages that are numbered in order (ie: index.html, 1.html, 2.html, 3.html, etc.). If a page (1.html) can lead to multiple decisions, the decisions start with 2.html, and then use letters to denote the various options (2.html, 2a.html, 2b.html, 2c.html, etc). These pages can also have linear workflows or decision trees assigned to them: (ie: 2a.html, 2a1.html 2a2.html, 2a3.html OR 2a.html -> 2a1.html, 2a1a.html, 2a1b.html)

This navigation can be compiled into a site map with helpers that allow it to be easily browsed through in the narration module (TODO).

#### Forms & Variables
PK uses localstorage to save data, mimicing form submission, login, etc. The variables are stored across the app and easily accessible with an API.

#### Survey links
Embed a survey link to typeform or google docs easily with these helper classes in the narration module.

#### Intro, outro, and test pages
PK is meant to be easy to have real users test it. Build it, upload it to a server, and send the url to your user testers. Build your surveys for feedback. 

### Goals of development

* Build pages quickly. You may need 40-50 pages to cover all the various scenarios, so move fast. 
* Ignore layout, font, color, branding, and design decisions as much as possible. Focus on narration and functionality. Utilize frameworks like Bootstrap or Milligram to have a clean, consistent style.
* 

