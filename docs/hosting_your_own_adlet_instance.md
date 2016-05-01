# Hosting your own Adlet instance

To create an adlet instance you will need two buckets:

* Static bucket
* Articles bucket

Say your blog name was example.com, you could use the following for the bucket-names:

* example.com
* example.com-contents

The one that has the same name as your domain will be where you put Adlet's static files (html, js, css). The reason for this is so that you can easily configure your domain on S3.

## Creating an Articles bucket

See [Creating an Articles Bucket](/docs/creating_an_articles_bucket.md)

## Creating a static content bucket

See [Creating a Static Content Bucket](/docs/creating_a_static_content_bucket.mb)

## Customizing the Adlet instance

You will need to clone the repo locally so you can customize it to work with your settings.

In the directory where you cloned Adlet, open the `config/environment.js` file your favourite text editor.

In this file change the following fields with your own information from when you created your buckets

    * ReadOnlyAccessKeyID
    * ReadOnlySecretAccessKey
    * Region
    * Bucket

The bucket in this config file, should be your "contents" bucket.

Additionally if you know SASS you can change some variables in the `app/styles/colors.scss` file, specifically, the `brand_color` variable to the main color of your site.

## Building your application

When you are done configuring Adlet run the following command

```bash
ember build --environment production
```

This will create a folder names dist, that contains all the production ready, and minified assets you will need for your own instance of adlet

## Uploading the static files

You can now upload all the files in the dist directory to your static files bucket.

If you now visit your static bucket's web url, you will have your very own instance of Adlet!

## Custom domain

You probably want to use your own domain name too, but that configuration is outside the scope of this document please see [Website Hosting Custom Domain walkthrough](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html) that explains how you can set this up.
