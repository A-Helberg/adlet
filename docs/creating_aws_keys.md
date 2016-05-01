# Creating AWS Keys

To run adlet you will need to create 2 sets of API keys, one will be read only, so people can read your blog, and one that you as an admin will use to login and create new posts or articles.

# AWS account

The first thing you will need is an AWS account, if you don't already have one. Go to [https://aws.amazon.com](https://aws.amazon.com) and click on 

> Sign In to the Console

Follow the instructions to create an account.

# Creating a bucket

AWS buckets are analogous to folders.

Once you are logged in to the console, find the

> Storage & Content Delivery

section choose S3, and then click on 

> Create Bucket

Pick a bucket name, you should not use the domain name that Adlet will run on, because you will need this route for serving the static content, when setting up a domain name. Choose the region that you want the bucket to be in. *Take note of the region you picked* as this will be needed later.

Then click on 

> Create

Select your bucket from the list and click on

> Properties

in the top right hand corner. Expand the sections that says, 

> Permissions

and click on 

> Edit CORS Configuration

and paste the following in the box.

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

Then click on 

> Save

# Creating your keys

No go back to the AWS console by clicking the cube in the top left section of the site.

Find the 

> Security & Identity

and click

> Identity & Access Management

In the left sidebar click on

> Users

and then

> Create New Users

fill in two User names, postfix one with `_admin` and one with `_read`, the names you pick are not important, but the more descriptive they are, the easier you will be able to find them in the future.

Make sure

> Generate an access key for each user
 
is checked

Once you have picked your two user names, click on

> Create

Your two users will now be created, you can view their API keys, by expanding

> Show User Security Credentials

Save these details somewhere safe!

# Creating permissions

Go back to the Identity & Access Management Page, click on Policies, and then Create Polcicy, then select create own policy. 

First we will make a policy for read only access to our block Pick a descriptive name and optional description, once again, the names don't matter, but take note of what you pick, because we'll need it later on.

Copy the below into the Policy Document, but change the text `bucket_name` to your actual bucket name.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": [
                "arn:aws:s3:::iostream.co.za/*",
                "arn:aws:s3:::iostream.co.za"
            ]
        }
    ]
}
```
and then click create, follow the same steps to create a key for your admin user, but this time use the code below for the admin policy

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
          "arn:aws:s3:::bucket_name/*",
          "arn:aws:s3:::bucket_name"
      ]
    }
  ]
}
```

remember to change your bucket name.

# Setting permissions for your users.

After creating your policies, you should see a list of all your policies. Let's attach those policies to the users.

Click on users in the lefthand panel, pick your read only user.

Click on the tab that says

> Permissions

and then

> Attach Policy

Find the read only policy we created in the previous step and tick it's box. (You can use the filter at the top to make the search easier). And then click

> Attach Policy

Repeat the same steps for your admin user, but attach, the admin policy you created.


That's it! You should now have the keys you need to set up Adlet, with the correct permissions.

