# Setting up this environment


# Build your blog with Hugo and GitHub Pages


## Set up GitHub Pages



## Set up Hugo

These are some steps to have a Hello World example of a blog using Hugo and GitHub Pages.


### Step 1: Install Hugo

```bash
sudo dnf install hugo
```

https://gohugo.io/getting-started/installing/#fedora-red-hat-and-centos


### Step 2: Generate repo scaffolding  

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


