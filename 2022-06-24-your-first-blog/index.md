# Setting up your first blog


# Build your blog with Hugo and GitHub Pages

In this blog post, we are going to create a **simple and minimalist personal** website using Hugo and GitHub Pages. With Github Pages, we can host a personal webpage without bothering about finding a domain name, and with Hugo, we have a variety of themes to choose from.

## Create your GitHub repository

First, you need to know that the name of your GH account or your repo will determine the URL where your web site will be located. Therefore, I recommend you to take some time to choose it.

According to the [official documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-a-repository-for-your-site) you can:
* Create a user site.
* Create an organization site.
* Create a repository site. I would not recommend this as everything will hang from the path `/<repo-name>` instead as from `/`.


## Setting up Hugo

Hugo is a **static site generator** that you can use to build **content-focussed, fast websites**. Static site generators usually allow you to write your content in a simple markup language, like Markdown. The static site generator then converts your content into static HTML files.

If you want to set up your first Hugo application, I recommend you to use official [Getting Started](https://gohugo.io/getting-started/quick-start/) documentation. If you are lazy and want to copy-paste some commands to install Hugo on Fedora, you can follow these steps:

### Step 1: Install Hugo

```bash
sudo dnf install hugo
```

If you have a different distro, check the [official documentation](https://gohugo.io/getting-started/installing/#fedora-red-hat-and-centos).


### Step 2: Generate the repo scaffolding



```bash
git clone git@github.com:alvarolop/alvarolop.github.io.git
cd alvarolop.github.io
hugo new site . --force
```


### Step 3: Add your theme

I decided to create the blog using this trendy Hugo theme: https://themes.gohugo.io/themes/loveit/

```bash
git submodule add https://github.com/dillonzq/LoveIt.git themes/loveit
echo theme # \"loveit\" >> config.toml
```

Other interesting themes: https://themes.gohugo.io/themes/hugo-papermod/

Full LoveIt documentation: https://hugoloveit.com/




hugo new posts/my-first-post.md


hugo server -D






## Setting up GitHub Pages


