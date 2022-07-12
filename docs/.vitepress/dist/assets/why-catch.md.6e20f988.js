import{_ as e,c as t,o,a as r}from"./app.f3758f8e.js";const m=JSON.parse('{"title":"Why do we need yet another C++ test framework?","description":"","frontmatter":{},"headers":[{"level":2,"title":"Key Features","slug":"key-features"},{"level":2,"title":"Other core features","slug":"other-core-features"},{"level":2,"title":"Who else is using Catch2?","slug":"who-else-is-using-catch2"}],"relativePath":"why-catch.md","lastUpdated":1628458937000}'),a={name:"why-catch.md"},s=r('<p><a id="top"></a></p><h1 id="why-do-we-need-yet-another-c-test-framework" tabindex="-1">Why do we need yet another C++ test framework? <a class="header-anchor" href="#why-do-we-need-yet-another-c-test-framework" aria-hidden="true">#</a></h1><p>Good question. For C++ there are quite a number of established frameworks, including (but not limited to), <a href="http://code.google.com/p/googletest/" target="_blank" rel="noopener noreferrer">Google Test</a>, <a href="http://www.boost.org/doc/libs/1_49_0/libs/test/doc/html/index.html" target="_blank" rel="noopener noreferrer">Boost.Test</a>, <a href="http://sourceforge.net/apps/mediawiki/cppunit/index.php?title=Main_Page" target="_blank" rel="noopener noreferrer">CppUnit</a>, <a href="http://www.cute-test.com" target="_blank" rel="noopener noreferrer">Cute</a>, and <a href="http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#C.2B.2B" target="_blank" rel="noopener noreferrer">many, many more</a>.</p><p>So what does Catch2 bring to the party that differentiates it from these? Apart from the catchy name, of course.</p><h2 id="key-features" tabindex="-1">Key Features <a class="header-anchor" href="#key-features" aria-hidden="true">#</a></h2><ul><li>Quick and easy to get started. Just download two files, add them into your project and you&#39;re away.</li><li>No external dependencies. As long as you can compile C++14 and have the C++ standard library available.</li><li>Write test cases as, self-registering, functions (or methods, if you prefer).</li><li>Divide test cases into sections, each of which is run in isolation (eliminates the need for fixtures).</li><li>Use BDD-style Given-When-Then sections as well as traditional unit test cases.</li><li>Only one core assertion macro for comparisons. Standard C/C++ operators are used for the comparison - yet the full expression is decomposed and lhs and rhs values are logged.</li><li>Tests are named using free-form strings - no more couching names in legal identifiers.</li></ul><h2 id="other-core-features" tabindex="-1">Other core features <a class="header-anchor" href="#other-core-features" aria-hidden="true">#</a></h2><ul><li>Tests can be tagged for easily running ad-hoc groups of tests.</li><li>Failures can (optionally) break into the debugger on common platforms.</li><li>Output is through modular reporter objects. Basic textual and XML reporters are included. Custom reporters can easily be added.</li><li>JUnit xml output is supported for integration with third-party tools, such as CI servers.</li><li>A default main() function is provided, but you can supply your own for complete control (e.g. integration into your own test runner GUI).</li><li>A command line parser is provided and can still be used if you choose to provided your own main() function.</li><li>Alternative assertion macro(s) report failures but don&#39;t abort the test case</li><li>Good set of facilities for floating point comparisons (<code>Catch::Approx</code> and full set of matchers)</li><li>Internal and friendly macros are isolated so name clashes can be managed</li><li>Data generators (data driven test support)</li><li>Hamcrest-style Matchers for testing complex properties</li><li>Microbenchmarking support</li></ul><h2 id="who-else-is-using-catch2" tabindex="-1">Who else is using Catch2? <a class="header-anchor" href="#who-else-is-using-catch2" aria-hidden="true">#</a></h2><p>A whole lot of people. According to the 2021 Jetbrains C++ ecosystem survey, about 11% of C++ programmers use Catch2 for unit testing, making it the second most popular unit testing framework.</p><p>You can also take a look at the (incomplete) list of <a href="./opensource-users.html#top">open source projects</a> or the (very incomplete) list of <a href="./commercial-users.html#top">commercial users of Catch2</a> for some idea on who else also uses Catch2.</p><hr><p>See the <a href="./tutorial.html#top">tutorial</a> to get more of a taste of using Catch2 in practice.</p><hr><p><a href="./Readme.html#top">Home</a></p>',15),i=[s];function n(l,c,h,d,u,p){return o(),t("div",null,i)}var g=e(a,[["render",n]]);export{m as __pageData,g as default};
