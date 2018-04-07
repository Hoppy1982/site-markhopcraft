# Site structure notes

*Directory structure of the site.*

*ASCI characters:*
* │ 179
* ├ 195
* ─ 196

###### Nginx config files:
```
/
├──/etc
│  ├──/nginx
│  │  ├──nginx.conf
│  │  ├──proxy_params
│  │  ├──/sites-available
│  │  │  ├──markhopcraft.co.uk.conf (top level of domain is for portfolio)
│  │  │  ├──brain.markhopcraft.co.uk.conf (for notes, guides, to-do list etc)
```

###### Actual site files:
```
/
├──/home
│  ├──/user
│  │  ├──/www
│  │  │  ├──site-markhopcraft
│  │  │  │  ├──portfolio
│  │  │  │  ├──subdomain-brain
```

*I want to try things this way so I can experiment with different servers for small ideas whilst keeping everything under one umbrella for ease of backing up.*

*Using subdomains for the extra servers means I only have to pay to register one domain but lets me learn a little bit more about nginx config.*

*The plan is to be able to add on more subdomains.*
