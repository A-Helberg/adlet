# Adlet [![Build Status](https://travis-ci.org/A-Helberg/adlet.svg)](https://travis-ci.org/A-Helberg/adlet)

Adlet is a simple and elegant and open source blogging platform! But why not go with one of the many other bloggin platforms?

Adlet was built from the ground up, keeping in mind it's main tennant, and that is super cheap hosting.

As such adlet runs entirely on AWS S3, and that means hosting for as little as $0.03 per Gigabyte!!

Currently Adlet is in a very early alpha stage, but check back for our new features or [subscribe](http://eepurl.com/bkKLNr) for updates! 

## Hosting your own Adlet

See [hosting your own Adlet instance](/docs/hosting_your_own_adlet_instance.md)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [S3 Bucket and API Keys](https://aws.amazon.com/s3/)

## Installation

* `git clone https://github.com/A-Helberg/adlet` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

In the `config/environment.js` file, add in your AWS details. Then run

* `ember server`
* And visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

## Stay Updated
 Subscribe to our [mailing list](http://eepurl.com/bkKLNr) to receive updates about new & exciting features.
