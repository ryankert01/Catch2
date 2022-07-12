import{_ as e,c as t,o as a,a as i}from"./app.f3758f8e.js";const f=JSON.parse(`{"title":"Frequently Asked Questions (FAQ)","description":"","frontmatter":{},"headers":[{"level":2,"title":"How do I run global setup/teardown only if tests will be run?","slug":"how-do-i-run-global-setup-teardown-only-if-tests-will-be-run"},{"level":2,"title":"How do I clean up global state between running different tests?","slug":"how-do-i-clean-up-global-state-between-running-different-tests"},{"level":2,"title":"Why cannot I derive from the built-in reporters?","slug":"why-cannot-i-derive-from-the-built-in-reporters"},{"level":2,"title":"What is Catch2's ABI stability policy?","slug":"what-is-catch2-s-abi-stability-policy"},{"level":2,"title":"What is Catch2's API stability policy?","slug":"what-is-catch2-s-api-stability-policy"},{"level":2,"title":"Does Catch2 support running tests in parallel?","slug":"does-catch2-support-running-tests-in-parallel"}],"relativePath":"faq.md","lastUpdated":1656062431000}`),n={name:"faq.md"},s=i('<p><a id="top"></a></p><h1 id="frequently-asked-questions-faq" tabindex="-1">Frequently Asked Questions (FAQ) <a class="header-anchor" href="#frequently-asked-questions-faq" aria-hidden="true">#</a></h1><p><strong>Contents</strong><br><a href="#how-do-i-run-global-setupteardown-only-if-tests-will-be-run">How do I run global setup/teardown only if tests will be run?</a><br><a href="#how-do-i-clean-up-global-state-between-running-different-tests">How do I clean up global state between running different tests?</a><br><a href="#why-cannot-i-derive-from-the-built-in-reporters">Why cannot I derive from the built-in reporters?</a><br><a href="#what-is-catch2s-abi-stability-policy">What is Catch2&#39;s ABI stability policy?</a><br><a href="#what-is-catch2s-api-stability-policy">What is Catch2&#39;s API stability policy?</a><br></p><h2 id="how-do-i-run-global-setup-teardown-only-if-tests-will-be-run" tabindex="-1">How do I run global setup/teardown only if tests will be run? <a class="header-anchor" href="#how-do-i-run-global-setup-teardown-only-if-tests-will-be-run" aria-hidden="true">#</a></h2><p>Write a custom <a href="./event-listeners.html#top">event listener</a> and place the global setup/teardown code into the <code>testRun*</code> events.</p><h2 id="how-do-i-clean-up-global-state-between-running-different-tests" tabindex="-1">How do I clean up global state between running different tests? <a class="header-anchor" href="#how-do-i-clean-up-global-state-between-running-different-tests" aria-hidden="true">#</a></h2><p>Write a custom <a href="./event-listeners.html#top">event listener</a> and place the cleanup code into either <code>testCase*</code> or <code>testCasePartial*</code> events, depending on how often the cleanup needs to happen.</p><h2 id="why-cannot-i-derive-from-the-built-in-reporters" tabindex="-1">Why cannot I derive from the built-in reporters? <a class="header-anchor" href="#why-cannot-i-derive-from-the-built-in-reporters" aria-hidden="true">#</a></h2><p>They are not made to be overriden, in that we do not attempt to maintain a consistent internal state if a member function is overriden, and by forbidding users from using them as a base class, we can refactor them as needed later.</p><h2 id="what-is-catch2-s-abi-stability-policy" tabindex="-1">What is Catch2&#39;s ABI stability policy? <a class="header-anchor" href="#what-is-catch2-s-abi-stability-policy" aria-hidden="true">#</a></h2><p>Catch2 provides no ABI stability guarantees whatsoever. Catch2 provides rich C++ interface, and trying to freeze its ABI would take a lot of pointless work.</p><p>Catch2 is not designed to be distributed as dynamic library, and you should really be able to compile everything with the same compiler binary.</p><h2 id="what-is-catch2-s-api-stability-policy" tabindex="-1">What is Catch2&#39;s API stability policy? <a class="header-anchor" href="#what-is-catch2-s-api-stability-policy" aria-hidden="true">#</a></h2><p>Catch2 follows <a href="https://semver.org/" target="_blank" rel="noopener noreferrer">semver</a> to the best of our ability. This means that we will not knowingly make backwards-incompatible changes without incrementing the major version number.</p><h2 id="does-catch2-support-running-tests-in-parallel" tabindex="-1">Does Catch2 support running tests in parallel? <a class="header-anchor" href="#does-catch2-support-running-tests-in-parallel" aria-hidden="true">#</a></h2><p>Not natively, no. We see running tests in parallel as the job of an external test runner, that can also run them in separate processes, support test execution timeouts and so on.</p><p>However, Catch2 provides some tools that make the job of external test runners easier. <a href="./usage-tips.html#parallel-tests">See the relevant section in our page on best practices</a>.</p><hr><p><a href="./Readme.html#top">Home</a></p>',19),r=[s];function o(l,h,d,c,p,u){return a(),t("div",null,r)}var w=e(n,[["render",o]]);export{f as __pageData,w as default};
