import{_ as s,c as e,o as n,a}from"./app.f3758f8e.js";const h=JSON.parse('{"title":"Reporter events","description":"","frontmatter":{},"headers":[{"level":2,"title":"Test running events","slug":"test-running-events"},{"level":3,"title":"testRun events","slug":"testrun-events"},{"level":3,"title":"testCase events","slug":"testcase-events"},{"level":3,"title":"testCasePartial events","slug":"testcasepartial-events"},{"level":3,"title":"section events","slug":"section-events"},{"level":3,"title":"assertion events","slug":"assertion-events"},{"level":2,"title":"Benchmarking events","slug":"benchmarking-events"},{"level":2,"title":"Listings events","slug":"listings-events"},{"level":2,"title":"Miscellaneous events","slug":"miscellaneous-events"}],"relativePath":"reporter-events.md","lastUpdated":1652818416000}'),t={name:"reporter-events.md"},o=a(`<p><a id="top"></a></p><h1 id="reporter-events" tabindex="-1">Reporter events <a class="header-anchor" href="#reporter-events" aria-hidden="true">#</a></h1><p><strong>Contents</strong><br><a href="#test-running-events">Test running events</a><br><a href="#benchmarking-events">Benchmarking events</a><br><a href="#listings-events">Listings events</a><br><a href="#miscellaneous-events">Miscellaneous events</a><br></p><p>Reporter events are one of the customization points for user code. They are used by <a href="./reporters.html#top">reporters</a> to customize Catch2&#39;s output, and by <a href="./event-listeners.html#top">event listeners</a> to perform in-process actions under some conditions.</p><p>There are currently 21 reporter events in Catch2, split between 4 distinct event groups:</p><ul><li>test running events (10 events)</li><li>benchmarking (4 events)</li><li>listings (3 events)</li><li>miscellaneous (4 events)</li></ul><h2 id="test-running-events" tabindex="-1">Test running events <a class="header-anchor" href="#test-running-events" aria-hidden="true">#</a></h2><p>Test running events are always paired so that for each <code>fooStarting</code> event, there is a <code>fooEnded</code> event. This means that the 10 test running events consist of 5 pairs of events:</p><ul><li><code>testRunStarting</code> and <code>testRunEnded</code>,</li><li><code>testCaseStarting</code> and <code>testCaseEnded</code>,</li><li><code>testCasePartialStarting</code> and <code>testCasePartialEnded</code>,</li><li><code>sectionStarting</code> and <code>sectionEnded</code>,</li><li><code>assertionStarting</code> and <code>assertionEnded</code></li></ul><h3 id="testrun-events" tabindex="-1"><code>testRun</code> events <a class="header-anchor" href="#testrun-events" aria-hidden="true">#</a></h3><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testRunStarting</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestRunInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> testRunInfo </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testRunEnded</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestRunStats</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> testRunStats </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>The <code>testRun</code> events bookend the entire test run. <code>testRunStarting</code> is emitted before the first test case is executed, and <code>testRunEnded</code> is emitted after all the test cases have been executed.</p><h3 id="testcase-events" tabindex="-1"><code>testCase</code> events <a class="header-anchor" href="#testcase-events" aria-hidden="true">#</a></h3><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testCaseStarting</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestCaseInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> testInfo </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testCaseEnded</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestCaseStats</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> testCaseStats </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>The <code>testCase</code> events bookend one <em>full</em> run of a specific test case. Individual runs through a test case, e.g. due to <code>SECTION</code>s or <code>GENERATE</code>s, are handled by a different event.</p><h3 id="testcasepartial-events" tabindex="-1"><code>testCasePartial</code> events <a class="header-anchor" href="#testcasepartial-events" aria-hidden="true">#</a></h3><blockquote><p>Introduced in Catch2 3.0.1</p></blockquote><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testCasePartialStarting</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestCaseInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> testInfo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">uint64_t</span><span style="color:#A6ACCD;"> partNumber </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testCasePartialEnded</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">TestCaseStats</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> testCaseStats</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">uint64_t</span><span style="color:#A6ACCD;"> partNumber </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>testCasePartial</code> events bookend one <em>partial</em> run of a specific test case. This means that for any given test case, these events can be emitted multiple times, e.g. due to multiple leaf sections.</p><p>In regards to nesting with <code>testCase</code> events, <code>testCasePartialStarting</code> will never be emitted before the corresponding <code>testCaseStarting</code>, and <code>testCasePartialEnded</code> will always be emitted before the corresponding <code>testCaseEnded</code>.</p><h3 id="section-events" tabindex="-1"><code>section</code> events <a class="header-anchor" href="#section-events" aria-hidden="true">#</a></h3><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sectionStarting</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SectionInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> sectionInfo </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sectionEnded</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SectionStats</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> sectionStats </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>section</code> events are emitted only for active <code>SECTION</code>s, that is, sections that are entered. Sections that are skipped in this test case run-through do not cause events to be emitted.</p><p><em>Note that test cases always contain one implicit section. The event for this section is emitted after the corresponding <code>testCasePartialStarting</code> event.</em></p><h3 id="assertion-events" tabindex="-1"><code>assertion</code> events <a class="header-anchor" href="#assertion-events" aria-hidden="true">#</a></h3><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">assertionStarting</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AssertionInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> assertionInfo </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">assertionEnded</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AssertionStats</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> assertionStats </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>assertionStarting</code> is called after the expression is captured, but before the assertion expression is evaluated. This might seem like a minor distinction, but what it means is that if you have assertion like <code>REQUIRE( a + b == c + d )</code>, then what happens is that <code>a + b</code> and <code>c + d</code> are evaluated before <code>assertionStarting</code> is emitted, while the <code>==</code> is evaluated after the event.</p><h2 id="benchmarking-events" tabindex="-1">Benchmarking events <a class="header-anchor" href="#benchmarking-events" aria-hidden="true">#</a></h2><blockquote><p><a href="https://github.com/catchorg/Catch2/issues/1616" target="_blank" rel="noopener noreferrer">Introduced</a> in Catch2 2.9.0.</p></blockquote><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">benchmarkPreparing</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">StringRef</span><span style="color:#A6ACCD;"> name </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">override</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">benchmarkStarting</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BenchmarkInfo</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> benchmarkInfo </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">override</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">benchmarkEnded</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BenchmarkStats</span><span style="color:#89DDFF;">&lt;&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> benchmarkStats </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">override</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">benchmarkFailed</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">StringRef</span><span style="color:#A6ACCD;"> error </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">override</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Due to the benchmark lifecycle being bit more complicated, the benchmarking events have their own category, even though they could be seen as parallel to the <code>assertion*</code> events. You should expect running a benchmark to generate at least 2 of the events above.</p><p>To understand the explanation below, you should read the <a href="./benchmarks.html#top">benchmarking documentation</a> first.</p><ul><li><code>benchmarkPreparing</code> event is sent after the environmental probe finishes, but before the user code is first estimated.</li><li><code>benchmarkStarting</code> event is sent after the user code is estimated, but has not been benchmarked yet.</li><li><code>benchmarkEnded</code> event is sent after the user code has been benchmarked, and contains the benchmarking results.</li><li><code>benchmarkFailed</code> event is sent if either the estimation or the benchmarking itself fails.</li></ul><h2 id="listings-events" tabindex="-1">Listings events <a class="header-anchor" href="#listings-events" aria-hidden="true">#</a></h2><blockquote><p>Introduced in Catch2 3.0.1.</p></blockquote><p>Listings events are events that correspond to the test binary being invoked with <code>--list-foo</code> flag.</p><p>There are currently 3 listing events, one for reporters, one for tests, and one for tags. Note that they are not exclusive to each other.</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">listReporters</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">vector</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ReporterDescription</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> descriptions </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">listTests</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">vector</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">TestCaseHandle</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> tests </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">listTags</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">vector</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">TagInfo</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#A6ACCD;"> tagInfos </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="miscellaneous-events" tabindex="-1">Miscellaneous events <a class="header-anchor" href="#miscellaneous-events" aria-hidden="true">#</a></h2><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">reportInvalidTestSpec</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">StringRef</span><span style="color:#A6ACCD;"> unmatchedSpec </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fatalErrorEncountered</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">StringRef</span><span style="color:#A6ACCD;"> error </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">noMatchingTestCases</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">StringRef</span><span style="color:#A6ACCD;"> unmatchedSpec </span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>These are one-off events that do not neatly fit into other categories.</p><p><code>reportInvalidTestSpec</code> is sent for each <a href="./command-line.html#specifying-which-tests-to-run">test specification command line argument</a> that wasn&#39;t parsed into a valid spec.</p><p><code>fatalErrorEncountered</code> is sent when Catch2&#39;s POSIX signal handling or Windows SE handler is called into with a fatal signal/exception.</p><p><code>noMatchingTestCases</code> is sent for each user provided test specification that did not match any registered tests.</p><hr><p><a href="./Readme.html#top">Home</a></p>`,46),l=[o];function p(r,c,i,d,C,y){return n(),e("div",null,l)}var F=s(t,[["render",p]]);export{h as __pageData,F as default};
