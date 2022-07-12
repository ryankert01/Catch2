import{_ as e,c as a,o as t,a as n}from"./app.f3758f8e.js";const f=JSON.parse('{"title":"Deprecations and incoming changes","description":"","frontmatter":{},"headers":[{"level":3,"title":"ParseAndAddCatchTests.cmake","slug":"parseandaddcatchtests-cmake"},{"level":3,"title":"CATCH_CONFIG_BAZEL_SUPPORT","slug":"catch-config-bazel-support"}],"relativePath":"deprecations.md","lastUpdated":1657612778000}'),i={name:"deprecations.md"},c=n('<p><a id="top"></a></p><h1 id="deprecations-and-incoming-changes" tabindex="-1">Deprecations and incoming changes <a class="header-anchor" href="#deprecations-and-incoming-changes" aria-hidden="true">#</a></h1><p>This page documents current deprecations and upcoming planned changes inside Catch2. The difference between these is that a deprecated feature will be removed, while a planned change to a feature means that the feature will behave differently, but will still be present. Obviously, either of these is a breaking change, and thus will not happen until at least the next major release.</p><h3 id="parseandaddcatchtests-cmake" tabindex="-1"><code>ParseAndAddCatchTests.cmake</code> <a class="header-anchor" href="#parseandaddcatchtests-cmake" aria-hidden="true">#</a></h3><p>The CMake/CTest integration using <code>ParseAndAddCatchTests.cmake</code> is deprecated, as it can be replaced by <code>Catch.cmake</code> that provides the function <code>catch_discover_tests</code> to get tests directly from a CMake target via the command line interface instead of parsing C++ code with regular expressions.</p><h3 id="catch-config-bazel-support" tabindex="-1"><code>CATCH_CONFIG_BAZEL_SUPPORT</code> <a class="header-anchor" href="#catch-config-bazel-support" aria-hidden="true">#</a></h3><p>Catch2 supports writing the Bazel JUnit XML output file when it is aware that is within a bazel testing environment. Originally there was no way to accurately probe the environment for this information so the flag <code>CATCH_CONFIG_BAZEL_SUPPORT</code> was added. This now deprecated. Bazel has now had a change where it will export <code>BAZEL_TEST=1</code> for purposes like the above. Catch2 will now instead inspect the environment instead of relying on build configuration.</p><hr><p><a href="./Readme.html#top">Home</a></p>',9),s=[c];function d(o,r,h,p,l,_){return t(),a("div",null,s)}var g=e(i,[["render",d]]);export{f as __pageData,g as default};
