# Creating a Static content bucket

AWS buckets are analogous to folders.

Once you are logged in to the console, find the

> Storage & Content Delivery

section choose S3, and then click on 

> Create Bucket

Pick a bucket name, you will probably want to use your domain name for this one. Choose the region that you want the bucket to be in.

Then click on 

> Create

Select your bucket from the list and click on

> Properties

in the top right hand corner. Expand the section that says, 

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

Click on 

> Edit bucket policy

and paste the following in the box

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "PublicReadGetObject",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::bucketname/*"
		}
	]
}
```
and replace `bucketname` with your actual bucket name.

Click save, and then expand the section that says

> Static Website Hosting

Select the section named 

> Enable website hosting

and fill in `index.html` for both the Index Document and Error Document fields.

Then click on 

> Save

That's it! Your static content bucket is ready to be used.