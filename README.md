<h1> :sparkles: Continius Integration script :sparkles: </h1>

CI script for github frontend repo. Using long pooling for updates check.

<h2> :fire: About :fire: </h2>

<p>
  Application entrypoint - start function. First lines create all folders from config (if it not exist). <br>
  Main programm is endless lifecycle. It call one function - CheckFrontend for checking frontend repo for any update. Then it sleep 10 sec. <br>
  CheckFrontend function look inside frontend folder and if there is no any files script will clone repo and build it. <br>
  If fe folder contains something script will pull repository. If std out not include 'Already up to date' it is succedded pull and project will rebuild. <br>
<p>

<h2> :memo: Configuration :memo: </h2>
<p>
  You can configure this script from config.json and .env file 
</p>
<h3> :pencil2: configuration.json </h3>
<ul>
  <li>
    repoUrl - repository URL. Must include @username and @pass that will replaced with your credentials from env
  </li>
  <li>
    branchToPull - repository branch.
  </li>
  <li>
    buildFolder - folder where to place build project. Must be relative from index.js folder or absolute path.
  </li>
  <li>
    indexHTMLFolder - index.html folder path. Must be relative from index.js folder or absolute path.
  </li>
</ul>

<h3> :wrench: .env </h3>

<ul>
  <li>
    Username - github username
  </li>
  <li>
    Pass - github password
  </li>
</ul>

<p>
  This credentials using for pull/clone repositories (repoUrl)
</p>
