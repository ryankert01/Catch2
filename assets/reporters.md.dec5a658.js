import{_ as e,c as s,o as t,a}from"./app.f3758f8e.js";const F=JSON.parse('{"title":"Reporters","description":"","frontmatter":{},"headers":[{"level":2,"title":"Using different reporters","slug":"using-different-reporters"},{"level":2,"title":"Using multiple reporters","slug":"using-multiple-reporters"},{"level":2,"title":"Writing your own reporter","slug":"writing-your-own-reporter"},{"level":3,"title":"Utility reporter bases","slug":"utility-reporter-bases"},{"level":3,"title":"ReporterPreferences","slug":"reporterpreferences"},{"level":3,"title":"Per-reporter configuration","slug":"per-reporter-configuration"},{"level":3,"title":"Other expected functionality of a reporter","slug":"other-expected-functionality-of-a-reporter"}],"relativePath":"reporters.md","lastUpdated":1657612778000}'),n={name:"reporters.md"},r=a(`<p><a id="top"></a></p><h1 id="reporters" tabindex="-1">Reporters <a class="header-anchor" href="#reporters" aria-hidden="true">#</a></h1><p>Reporters are a customization point for most of Catch2&#39;s output, e.g. formatting and writing out <a href="./reporter-events.html#top">assertions (whether passing or failing), sections, test cases, benchmarks, and so on</a>.</p><p>Catch2 comes with a bunch of reporters by default (currently 8), and you can also write your own reporter. Because multiple reporters can be active at the same time, your own reporters do not even have to handle all reporter event, just the ones you are interested in, e.g. benchmarks.</p><h2 id="using-different-reporters" tabindex="-1">Using different reporters <a class="header-anchor" href="#using-different-reporters" aria-hidden="true">#</a></h2><p>You can see which reporters are available by running the test binary with <code>--list-reporters</code>. You can then pick one of them with the <a href="./command-line.html#choosing-a-reporter-to-use"><code>-r</code>, <code>--reporter</code> option</a>, followed by the name of the desired reporter, like so:</p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">--reporter xml</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>You can also select multiple reporters to be used at the same time. In that case you should read the <a href="#multiple-reporters">section on using multiple reporters</a> to avoid any surprises from doing so.</p><p><a id="multiple-reporters"></a></p><h2 id="using-multiple-reporters" tabindex="-1">Using multiple reporters <a class="header-anchor" href="#using-multiple-reporters" aria-hidden="true">#</a></h2><blockquote><p>Support for having multiple parallel reporters was <a href="https://github.com/catchorg/Catch2/pull/2183" target="_blank" rel="noopener noreferrer">introduced</a> in Catch2 3.0.1</p></blockquote><p>Catch2 supports using multiple reporters at the same time while having them write into different destinations. The two main uses of this are</p><ul><li>having both human-friendly and machine-parseable (e.g. in JUnit format) output from one run of binary</li><li>having &quot;partial&quot; reporters that are highly specialized, e.g. having one reporter that writes out benchmark results as markdown tables and does nothing else, while also having standard testing output separately</li></ul><p>Specifying multiple reporter looks like this:</p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">--reporter JUnit::out=result-junit.xml --reporter console::out=-::colour-mode=ansi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>This tells Catch2 to use two reporters, <code>JUnit</code> reporter that writes its machine-readable XML output to file <code>result-junit.xml</code>, and the <code>console</code> reporter that writes its user-friendly output to stdout and uses ANSI colour codes for colouring the output.</p><p>Using multiple reporters (or one reporter and one-or-more <a href="./event-listeners.html#top">event listeners</a>) can have surprisingly complex semantics when using customization points provided to reporters by Catch2, namely capturing stdout/stderr from test cases.</p><p>As long as at least one reporter (or listener) asks Catch2 to capture stdout/stderr, captured stdout and stderr will be available to all reporters and listeners.</p><p>Because this might be surprising to the users, if at least one active <em>reporter</em> is non-capturing, then Catch2 tries to roughly emulate non-capturing behaviour by printing out the captured stdout/stderr just before <code>testCasePartialEnded</code> event is sent out to the active reporters and listeners. This means that stdout/stderr is no longer printed out from tests as it is being written, but instead it is written out in batch after each runthrough of a test case is finished.</p><h2 id="writing-your-own-reporter" tabindex="-1">Writing your own reporter <a class="header-anchor" href="#writing-your-own-reporter" aria-hidden="true">#</a></h2><p>You can also write your own custom reporter and tell Catch2 to use it. When writing your reporter, you have two options:</p><ul><li>Derive from <code>Catch::ReporterBase</code>. When doing this, you will have to provide handling for all <a href="./reporter-events.html#top">reporter events</a>.</li><li>Derive from one of the provided <a href="#utility-reporter-bases">utility reporter bases in Catch2</a>.</li></ul><p>Generally we recommend doing the latter, as it is less work.</p><p>Apart from overriding handling of the individual reporter events, reporters have access to some extra customization points, described below.</p><h3 id="utility-reporter-bases" tabindex="-1">Utility reporter bases <a class="header-anchor" href="#utility-reporter-bases" aria-hidden="true">#</a></h3><p>Catch2 currently provides two utility reporter bases:</p><ul><li><code>Catch::StreamingReporterBase</code></li><li><code>Catch::CumulativeReporterBase</code></li></ul><p><code>StreamingReporterBase</code> is useful for reporters that can format and write out the events as they come in. It provides (usually empty) implementation for all reporter events, and if you let it handle the relevant events, it also handles storing information about active test run and test case.</p><p><code>CumulativeReporterBase</code> is a base for reporters that need to see the whole test run, before they can start writing the output, such as the JUnit and SonarQube reporters. This post-facto approach requires the assertions to be stringified when it is finished, so that the assertion can be written out later. Because the stringification can be expensive, and not all cumulative reporters need the assertions, this base provides customization point to change whether the assertions are saved or not, separate for passing and failing assertions.</p><p><em>Generally we recommend that if you override a member function from either of the bases, you call into the base&#39;s implementation first. This is not necessarily in all cases, but it is safer and easier.</em></p><p>Writing your own reporter then looks like this:</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">catch2/reporters/catch_reporter_streaming_base.hpp</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">catch2/catch_test_case_info.hpp</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">catch2/reporters/catch_reporter_registrars.hpp</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">iostream</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">PartialReporter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">public</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Catch</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">StreamingReporterBase</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#F78C6C;">using</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">StreamingReporterBase</span><span style="color:#89DDFF;">::</span><span style="color:#F07178;">StreamingReporterBase</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">static</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">string</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getDescription</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Reporter for testing TestCasePartialStarting/Ended events</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">void</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">testCasePartialStarting</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Catch</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">TestCaseInfo</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">testInfo</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                                 </span><span style="color:#C792EA;">uint64_t</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">partNumber</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">override</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#F07178;">cout </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TestCaseStartingPartial: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">testInfo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> partNumber </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">void</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">testCasePartialEnded</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Catch</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">TestCaseStats</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">testCaseStats</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                              </span><span style="color:#C792EA;">uint64_t</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">partNumber</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">override</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#F07178;">cout </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TestCasePartialEnded: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">testCaseStats</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">testInfo</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> partNumber </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">CATCH_REGISTER_REPORTER</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">partial</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> PartialReporter</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>This create a simple reporter that responds to <code>testCasePartial*</code> events, and calls itself &quot;partial&quot; reporter, so it can be invoked with <code>--reporter partial</code> command line flag.</p><h3 id="reporterpreferences" tabindex="-1"><code>ReporterPreferences</code> <a class="header-anchor" href="#reporterpreferences" aria-hidden="true">#</a></h3><p>Each reporter instance contains instance of <code>ReporterPreferences</code>, a type that holds flags for the behaviour of Catch2 when this reporter run. Currently there are two customization options:</p><ul><li><code>shouldRedirectStdOut</code> - whether the reporter wants to handle writes to stdout/stderr from user code, or not. This is useful for reporters that output machine-parseable output, e.g. the JUnit reporter, or the XML reporter.</li><li><code>shouldReportAllAssertions</code> - whether the reporter wants to handle <code>assertionEnded</code> events for passing assertions as well as failing assertions. Usually reporters do not report successful assertions and don&#39;t need them for their output, but sometimes the desired output format includes passing assertions even without the <code>-s</code> flag.</li></ul><h3 id="per-reporter-configuration" tabindex="-1">Per-reporter configuration <a class="header-anchor" href="#per-reporter-configuration" aria-hidden="true">#</a></h3><blockquote><p>Per-reporter configuration was introduced in Catch2 3.0.1</p></blockquote><p>Catch2 supports some configuration to happen per reporter. The configuration options fall into one of two categories:</p><ul><li>Catch2-recognized options</li><li>Reporter-specific options</li></ul><p>The former is a small set of universal options that Catch2 handles for the reporters, e.g. output file or console colour mode. The latter are options that the reporters have to handle themselves, but the keys and values can be arbitrary strings, as long as they don&#39;t contain <code>::</code>. This allows writing reporters that can be significantly customized at runtime.</p><p>Reporter-specific options always have to be prefixed with &quot;X&quot; (large letter X).</p><h3 id="other-expected-functionality-of-a-reporter" tabindex="-1">Other expected functionality of a reporter <a class="header-anchor" href="#other-expected-functionality-of-a-reporter" aria-hidden="true">#</a></h3><p>When writing a custom reporter, there are few more things that you should keep in mind. These are not important for correctness, but they are important for the reporter to work <em>nicely</em>.</p><ul><li><p>Catch2 provides a simple verbosity option for users. There are three verbosity levels, &quot;quiet&quot;, &quot;normal&quot;, and &quot;high&quot;, and if it makes sense for reporter&#39;s output format, it should respond to these by changing what, and how much, it writes out.</p></li><li><p>Catch2 operates with an rng-seed. Knowing what seed a test run had is important if you want to replicate it, so your reporter should report the rng-seed, if at all possible given the target output format.</p></li><li><p>Catch2 also operates with test filters, or test specs. If a filter is present, you should also report the filter, if at all possible given the target output format.</p></li></ul><hr><p><a href="./Readme.html#top">Home</a></p>`,47),o=[r];function l(p,i,c,u,h,d){return t(),s("div",null,o)}var m=e(n,[["render",l]]);export{F as __pageData,m as default};
