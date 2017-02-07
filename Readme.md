**NOTE: Prototype kit is not really usable yet. Sorry!**

# Prototype Kit

Prototype kit (PK) A set of scripts, components, and modules to do rapid prototyping of workflows.

## Intro

In the vast world of prototyping tools, including paper, sketch, invision, oragami, and more, PK is optimized for **exploring workflows**. It gives the bare bones needed to quickly build HTML/CSS pages that mimic the expected behavior of the real app.

PK aims to have the same fidelity as paper prototypes. Both are meant to be used when the idea is still forming to quickly discover issues and and test multiple solutions. Whereas paper prototype helps you quickly explore the components of each page and how they will work, PK aims to explore user choices - the input and selections of different options that lead to various results.

PK's goal is to be as **quick as paper prototypes to build** but still **correctly simulate use**, like link clicks and form submissions. It also aims to provide a framework for testers to explore scenario options with narration and navigational tools.

## Quick Start

* clone the repo
* open up terminal and navigate to the folder
* run `npm install && bower install`
* run `gulp watch`
* Add pages to `src/pages/` and go wild!

## The Tools behind Prototype-kit

In it's core, PK uses nunjucks and sass to build HTML and CSS. However, included with PK is several core modules that you can utilize for navigation, form fill/data storage, and more.

### Gulp
[Todo: write about gulp usage]

### File structure

The two major folders within PK are `src` and `public`. `public` is the folder that all the templates and css compiles to, and `src` is the folder where all your uncompiled templates and sass are. 

You do not want to work out of `public`. Put css/js libraries, images and other content in `public` so you html files can load them and then leave the section alone.

Within `src` is your pages, partials, and scss. When gulp watch is running, these pages are instantly compiled into public whenever a file is changed, allowing for instant updates to your web pages.

### Nunjucks & SASS References

PK is meant for development speed. If you know HTML and CSS but not Nunjucks and Sass, you should still feel free to dive right in. However, both Nunjucks and Sass have powerful composition tooling which allow you to write reusable code and can greatly speed up development time, so learning the basics is quite helpful.

The Nunjucks documentation is pretty good: https://mozilla.github.io/nunjucks/. If you have never used nunjucks before, the examples that are given there plus the initial template in PK should give you enough to get started. 

The sass docs are also good: http://sass-lang.com/guide. I like to follow a components based approach to build sass using BEM style. 

## PK Components

At the core of PK is an opinionated set of components that help define workflows and enable their user testing.

#### Narration:

The narration block is a styled popup that explains a page or the context for how you arrived at the page. Any time you have to explain to a user what is going on within the app, you should use the narrator.

To use, add a narrator block to your page template like so:
```
{% block narrator %}
    <p>Scenario: <b>You’ve just signed up and logged in.</b></p>
{% endblock %}
```

The following are some use cases for the narrator:

* Introducing the app to the tester with a small pitch
* Describing what happens without building the full experience out.
* If an event triggers the app to notify the user, you can describe what triggered the scenario *(after 5 days pass, you receive this email asking you to do this)*
* And lots more. Generally anything that breaks the 4th wall should use the narrator component.

If you would like to see how it is built, checkout `src/partials/narrator.njk` and `src/scss/base/narrator.scss`

The narrator block also contains automatic navigation links through the workflow.

The narration block is absolutely positioned and doesn't mess with your layout. It is shown when the page loads, but hides once the page scrolls or anything is clicked on.

#### Navigation:

Prototype kit uses a **naming convention** for file names covering two types of workflows - linear workflows and decision trees.

Following the naming convention allows PK to create dynamic links to the next, previous, parent and child pages and also build a site map. **These dynamic links are really, really helpful when moving around pages or adjusting workflows** since you do not have to change the links on the pages every time, and also in navigating through the pages quickly through a site map on the user testing end.

##### Linear Workflow

PK expects linear workflows have a starting point and also to be ordered by number: ie.
```
index.html
1.html
2.html
3.html
...
12.html
13.html
```

The starting point is either index.html, or an option of a decision tree.

##### Decision Tree Workflow

If a screen leads to multiple outcomes, the primary outcomes will be the next linear workflow, and other outcomes will be lettered like so:

```
...
2.html //has multiple outcomes
3.html 
  3a.html //is primary outcome (and also is next linear workflow)
  3b.html //is second outcome
  3c.html //is third outcome
  ...
  3z.html
4.html //continues the linear workflow from 3.html
```

Linear and tree workflows can be nested. A linear workflow can split into multiple outcomes, which can each have a linear workflow, etc. 
```
index.html
1.html
2.html
  //decision tree
  2a.html //this is 'the index page' of workflows from 2a
    //decision tree of 2a
    2aa.html
    2ab.html
    2ac.html
    //linear workflow of 2a
    2a1.html 
    2a2.html 
    2a3.html 
    //decision tree stemming from 2a3
      2a3a.html // yes, this can get confusing
      2a3b.html
      2a3c.html
  2b.html
  2c.html
4.html
```

##### Name scoping your workflows

If you would like to name scope your workflows you can do so in two ways:

The first is through folder structure:
```
|- public
  |- folder1 //the url to view will be localhost:3000/folder1/index.html
     |- index.html
     |- 1.html
     |- etc
  |- folder2 // localhost:3000/folder2/
     |- index.html
     |- 1.html
     |- etc
```

The second is by prefixing a name onto the file:
```
|- public
  |- pinitdraft.html // localhost:3000/pinitdraft.html
  |- pinitdraft-1.html
  |- pinitdraft-2.html
  |- pinitdraft-2a.html
  |- etc
```

Once you have followed the naming convention in creating your files, anytime you create links, you can add the class 'pknav' to enable dynamic navigation from it:

```

/* Classes to add navigation functionality 
 * Usage: Add to any button, link or div like so:
 * <a class='pknav next'>Next</a>
 */

'pknav' - Enable navigation functionality on any HTML element 

'restart' or 'index' - will go to index.html

'base' - will go to the start of the current workflow

'next' - will go to the next linear workflow.

'prev' - will go to the previous linear workflow

'parent' - will go to the start point for the decision tree.

'child-[a-z]' - ie: 'child-a', 'child-b', 'child-c', etc. Will go that particular decision node

'next-parent' - will go to the next item after the parent

```





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

