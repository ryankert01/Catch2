import{_ as e,c as a,o as s,a as t}from"./app.e2d1962b.js";const m=JSON.parse('{"title":"How to release","description":"","frontmatter":{},"headers":[{"level":2,"title":"Necessary steps","slug":"necessary-steps"},{"level":3,"title":"Testing","slug":"testing"},{"level":3,"title":"Incrementing version number","slug":"incrementing-version-number"},{"level":3,"title":"Release notes","slug":"release-notes"},{"level":3,"title":"Commit and push update to GitHub","slug":"commit-and-push-update-to-github"},{"level":3,"title":"Release on GitHub","slug":"release-on-github"}],"relativePath":"release-process.md","lastUpdated":1662589905000}'),n={name:"release-process.md"},r=t(`<p><a id="top"></a></p><h1 id="how-to-release" tabindex="-1">How to release <a class="header-anchor" href="#how-to-release" aria-hidden="true">#</a></h1><p>When enough changes have accumulated, it is time to release new version of Catch. This document describes the process in doing so, that no steps are forgotten. Note that all referenced scripts can be found in the <code>tools/scripts/</code> directory.</p><h2 id="necessary-steps" tabindex="-1">Necessary steps <a class="header-anchor" href="#necessary-steps" aria-hidden="true">#</a></h2><p>These steps are necessary and have to be performed before each new release. They serve to make sure that the new release is correct and linked-to from the standard places.</p><h3 id="testing" tabindex="-1">Testing <a class="header-anchor" href="#testing" aria-hidden="true">#</a></h3><p>All of the tests are currently run in our CI setup based on TravisCI and AppVeyor. As long as the last commit tested green, the release can proceed.</p><h3 id="incrementing-version-number" tabindex="-1">Incrementing version number <a class="header-anchor" href="#incrementing-version-number" aria-hidden="true">#</a></h3><p>Catch uses a variant of <a href="http://semver.org/" target="_blank" rel="noopener noreferrer">semantic versioning</a>, with breaking API changes (and thus major version increments) being very rare. Thus, the release will usually increment the patch version, when it only contains couple of bugfixes, or minor version, when it contains new functionality, or larger changes in implementation of current functionality.</p><p>After deciding which part of version number should be incremented, you can use one of the <code>*Release.py</code> scripts to perform the required changes to Catch.</p><p>This will take care of generating the single include header, updating version numbers everywhere and pushing the new version to Wandbox.</p><h3 id="release-notes" tabindex="-1">Release notes <a class="header-anchor" href="#release-notes" aria-hidden="true">#</a></h3><p>Once a release is ready, release notes need to be written. They should summarize changes done since last release. For rough idea of expected notes see previous releases. Once written, release notes should be added to <code>docs/release-notes.md</code>.</p><h3 id="commit-and-push-update-to-github" tabindex="-1">Commit and push update to GitHub <a class="header-anchor" href="#commit-and-push-update-to-github" aria-hidden="true">#</a></h3><p>After version number is incremented, single-include header is regenerated and release notes are updated, changes should be committed and pushed to GitHub.</p><h3 id="release-on-github" tabindex="-1">Release on GitHub <a class="header-anchor" href="#release-on-github" aria-hidden="true">#</a></h3><p>After pushing changes to GitHub, GitHub release <em>needs</em> to be created. Tag version and release title should be same as the new version, description should contain the release notes for the current release. We also attach the two amalgamated files as &quot;binaries&quot;.</p><p>Since 2.5.0, the release tag and the &quot;binaries&quot; (amalgamated files) should be PGP signed.</p><h4 id="signing-a-tag" tabindex="-1">Signing a tag <a class="header-anchor" href="#signing-a-tag" aria-hidden="true">#</a></h4><p>To create a signed tag, use <code>git tag -s &lt;VERSION&gt;</code>, where <code>&lt;VERSION&gt;</code> is the version being released, e.g. <code>git tag -s v2.6.0</code>.</p><p>Use the version name as the short message and the release notes as the body (long) message.</p><h4 id="signing-the-amalgamated-files" tabindex="-1">Signing the amalgamated files <a class="header-anchor" href="#signing-the-amalgamated-files" aria-hidden="true">#</a></h4><p>This will create ASCII-armored signatures for the two amalgamated files that are uploaded to the GitHub release:</p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">gpg --armor --output extras/catch_amalgamated.hpp.asc --detach-sig extras/catch_amalgamated.hpp</span></span>
<span class="line"><span style="color:#A6ACCD;">gpg --armor --output extras/catch_amalgamated.cpp.asc --detach-sig extras/catch_amalgamated.cpp</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><em>GPG does not support signing multiple files in single invocation.</em></p>`,25),i=[r];function o(d,l,h,c,p,u){return s(),a("div",null,i)}var b=e(n,[["render",o]]);export{m as __pageData,b as default};