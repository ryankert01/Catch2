import{_ as e,c as t,o,a}from"./app.f3758f8e.js";const _=JSON.parse(`{"title":"Compile-time configuration","description":"","frontmatter":{},"headers":[{"level":2,"title":"Prefixing Catch macros","slug":"prefixing-catch-macros"},{"level":2,"title":"Terminal colour","slug":"terminal-colour"},{"level":2,"title":"Console width","slug":"console-width"},{"level":2,"title":"stdout","slug":"stdout"},{"level":2,"title":"Fallback stringifier","slug":"fallback-stringifier"},{"level":2,"title":"Default reporter","slug":"default-reporter"},{"level":2,"title":"Bazel support","slug":"bazel-support"},{"level":2,"title":"C++11 toggles","slug":"c-11-toggles"},{"level":2,"title":"C++17 toggles","slug":"c-17-toggles"},{"level":2,"title":"Other toggles","slug":"other-toggles"},{"level":3,"title":"CATCH_CONFIG_FAST_COMPILE","slug":"catch-config-fast-compile"},{"level":3,"title":"CATCH_CONFIG_DISABLE_STRINGIFICATION","slug":"catch-config-disable-stringification"},{"level":3,"title":"CATCH_CONFIG_DISABLE","slug":"catch-config-disable"},{"level":2,"title":"Enabling stringification","slug":"enabling-stringification"},{"level":2,"title":"Disabling exceptions","slug":"disabling-exceptions"},{"level":2,"title":"Overriding Catch's debug break (-b)","slug":"overriding-catch-s-debug-break-b"}],"relativePath":"configuration.md","lastUpdated":1657612778000}`),i={name:"configuration.md"},n=a(`<p><a id="top"></a></p><h1 id="compile-time-configuration" tabindex="-1">Compile-time configuration <a class="header-anchor" href="#compile-time-configuration" aria-hidden="true">#</a></h1><p>Catch2 is designed to &quot;just work&quot; as much as possible, and most of the configuration options below are changed automatically during compilation, according to the detected environment. However, this detection can also be overriden by users, using macros documented below, and/or CMake options with the same name.</p><h2 id="prefixing-catch-macros" tabindex="-1">Prefixing Catch macros <a class="header-anchor" href="#prefixing-catch-macros" aria-hidden="true">#</a></h2><pre><code>CATCH_CONFIG_PREFIX_ALL
</code></pre><p>To keep test code clean and uncluttered Catch uses short macro names (e.g. <code>TEST_CASE</code> and <code>REQUIRE</code>). Occasionally these may conflict with identifiers from platform headers or the system under test. In this case the above identifier can be defined. This will cause all the Catch user macros to be prefixed with <code>CATCH_</code> (e.g. <code>CATCH_TEST_CASE</code> and <code>CATCH_REQUIRE</code>).</p><h2 id="terminal-colour" tabindex="-1">Terminal colour <a class="header-anchor" href="#terminal-colour" aria-hidden="true">#</a></h2><pre><code>CATCH_CONFIG_COLOUR_WIN32     // Force enables compiling colouring impl based on Win32 console API
CATCH_CONFIG_NO_COLOUR_WIN32  // Force disables ...
</code></pre><p>Yes, Catch2 uses the british spelling of colour.</p><p>Catch2 attempts to autodetect whether the Win32 console colouring API, <code>SetConsoleTextAttribute</code>, is available, and if it is available it compiles in a console colouring implementation that uses it.</p><p>This option can be used to override Catch2&#39;s autodetection and force the compilation either ON or OFF.</p><h2 id="console-width" tabindex="-1">Console width <a class="header-anchor" href="#console-width" aria-hidden="true">#</a></h2><pre><code>CATCH_CONFIG_CONSOLE_WIDTH = x // where x is a number
</code></pre><p>Catch formats output intended for the console to fit within a fixed number of characters. This is especially important as indentation is used extensively and uncontrolled line wraps break this. By default a console width of 80 is assumed but this can be controlled by defining the above identifier to be a different value.</p><h2 id="stdout" tabindex="-1">stdout <a class="header-anchor" href="#stdout" aria-hidden="true">#</a></h2><pre><code>CATCH_CONFIG_NOSTDOUT
</code></pre><p>To support platforms that do not provide <code>std::cout</code>, <code>std::cerr</code> and <code>std::clog</code>, Catch does not use them directly, but rather calls <code>Catch::cout</code>, <code>Catch::cerr</code> and <code>Catch::clog</code>. You can replace their implementation by defining <code>CATCH_CONFIG_NOSTDOUT</code> and implementing them yourself, their signatures are:</p><pre><code>std::ostream&amp; cout();
std::ostream&amp; cerr();
std::ostream&amp; clog();
</code></pre><p><a href="../examples/231-Cfg-OutputStreams.cpp">You can see an example of replacing these functions here.</a></p><h2 id="fallback-stringifier" tabindex="-1">Fallback stringifier <a class="header-anchor" href="#fallback-stringifier" aria-hidden="true">#</a></h2><p>By default, when Catch&#39;s stringification machinery has to stringify a type that does not specialize <code>StringMaker</code>, does not overload <code>operator&lt;&lt;</code>, is not an enumeration and is not a range, it uses <code>&quot;{?}&quot;</code>. This can be overridden by defining <code>CATCH_CONFIG_FALLBACK_STRINGIFIER</code> to name of a function that should perform the stringification instead.</p><p>All types that do not provide <code>StringMaker</code> specialization or <code>operator&lt;&lt;</code> overload will be sent to this function (this includes enums and ranges). The provided function must return <code>std::string</code> and must accept any type, e.g. via overloading.</p><p><em>Note that if the provided function does not handle a type and this type requires to be stringified, the compilation will fail.</em></p><h2 id="default-reporter" tabindex="-1">Default reporter <a class="header-anchor" href="#default-reporter" aria-hidden="true">#</a></h2><p>Catch&#39;s default reporter can be changed by defining macro <code>CATCH_CONFIG_DEFAULT_REPORTER</code> to string literal naming the desired default reporter.</p><p>This means that defining <code>CATCH_CONFIG_DEFAULT_REPORTER</code> to <code>&quot;console&quot;</code> is equivalent with the out-of-the-box experience.</p><h2 id="bazel-support" tabindex="-1">Bazel support <a class="header-anchor" href="#bazel-support" aria-hidden="true">#</a></h2><p>When <code>CATCH_CONFIG_BAZEL_SUPPORT</code> is defined or when <code>BAZEL_TEST=1</code> (which is set by the Bazel inside of a test environment), Catch2 will register a <code>JUnit</code> reporter writing to a path pointed by <code>XML_OUTPUT_FILE</code> provided by Bazel.</p><blockquote><p><code>CATCH_CONFIG_BAZEL_SUPPORT</code> was <a href="https://github.com/catchorg/Catch2/pull/2399" target="_blank" rel="noopener noreferrer">introduced</a> in Catch2 3.0.1.</p></blockquote><blockquote><p><code>CATCH_CONFIG_BAZEL_SUPPORT</code> was <a href="https://github.com/catchorg/Catch2/pull/2459" target="_blank" rel="noopener noreferrer">deprecated</a> in Catch2 X.Y.Z.</p></blockquote><h2 id="c-11-toggles" tabindex="-1">C++11 toggles <a class="header-anchor" href="#c-11-toggles" aria-hidden="true">#</a></h2><pre><code>CATCH_CONFIG_CPP11_TO_STRING // Use \`std::to_string\`
</code></pre><p>Because we support platforms whose standard library does not contain <code>std::to_string</code>, it is possible to force Catch to use a workaround based on <code>std::stringstream</code>. On platforms other than Android, the default is to use <code>std::to_string</code>. On Android, the default is to use the <code>stringstream</code> workaround. As always, it is possible to override Catch&#39;s selection, by defining either <code>CATCH_CONFIG_CPP11_TO_STRING</code> or <code>CATCH_CONFIG_NO_CPP11_TO_STRING</code>.</p><h2 id="c-17-toggles" tabindex="-1">C++17 toggles <a class="header-anchor" href="#c-17-toggles" aria-hidden="true">#</a></h2><pre><code>CATCH_CONFIG_CPP17_UNCAUGHT_EXCEPTIONS  // Override std::uncaught_exceptions (instead of std::uncaught_exception) support detection
CATCH_CONFIG_CPP17_STRING_VIEW          // Override std::string_view support detection (Catch provides a StringMaker specialization by default)
CATCH_CONFIG_CPP17_VARIANT              // Override std::variant support detection (checked by CATCH_CONFIG_ENABLE_VARIANT_STRINGMAKER)
CATCH_CONFIG_CPP17_OPTIONAL             // Override std::optional support detection (checked by CATCH_CONFIG_ENABLE_OPTIONAL_STRINGMAKER)
CATCH_CONFIG_CPP17_BYTE                 // Override std::byte support detection (Catch provides a StringMaker specialization by default)
</code></pre><blockquote><p><code>CATCH_CONFIG_CPP17_STRING_VIEW</code> was <a href="https://github.com/catchorg/Catch2/issues/1376" target="_blank" rel="noopener noreferrer">introduced</a> in Catch2 2.4.1.</p></blockquote><p>Catch contains basic compiler/standard detection and attempts to use some C++17 features whenever appropriate. This automatic detection can be manually overridden in both directions, that is, a feature can be enabled by defining the macro in the table above, and disabled by using <code>_NO_</code> in the macro, e.g. <code>CATCH_CONFIG_NO_CPP17_UNCAUGHT_EXCEPTIONS</code>.</p><h2 id="other-toggles" tabindex="-1">Other toggles <a class="header-anchor" href="#other-toggles" aria-hidden="true">#</a></h2><pre><code>CATCH_CONFIG_COUNTER                    // Use __COUNTER__ to generate unique names for test cases
CATCH_CONFIG_WINDOWS_SEH                // Enable SEH handling on Windows
CATCH_CONFIG_FAST_COMPILE               // Sacrifices some (rather minor) features for compilation speed
CATCH_CONFIG_POSIX_SIGNALS              // Enable handling POSIX signals
CATCH_CONFIG_WINDOWS_CRTDBG             // Enable leak checking using Windows&#39;s CRT Debug Heap
CATCH_CONFIG_DISABLE_STRINGIFICATION    // Disable stringifying the original expression
CATCH_CONFIG_DISABLE                    // Disables assertions and test case registration
CATCH_CONFIG_WCHAR                      // Enables use of wchart_t
CATCH_CONFIG_EXPERIMENTAL_REDIRECT      // Enables the new (experimental) way of capturing stdout/stderr
CATCH_CONFIG_USE_ASYNC                  // Force parallel statistical processing of samples during benchmarking
CATCH_CONFIG_ANDROID_LOGWRITE           // Use android&#39;s logging system for debug output
CATCH_CONFIG_GLOBAL_NEXTAFTER           // Use nextafter{,f,l} instead of std::nextafter
</code></pre><blockquote><p><a href="https://github.com/catchorg/Catch2/issues/1743" target="_blank" rel="noopener noreferrer"><code>CATCH_CONFIG_ANDROID_LOGWRITE</code></a> and <a href="https://github.com/catchorg/Catch2/pull/1739" target="_blank" rel="noopener noreferrer"><code>CATCH_CONFIG_GLOBAL_NEXTAFTER</code></a> were introduced in Catch2 2.10.0</p></blockquote><p>Currently Catch enables <code>CATCH_CONFIG_WINDOWS_SEH</code> only when compiled with MSVC, because some versions of MinGW do not have the necessary Win32 API support.</p><p><code>CATCH_CONFIG_POSIX_SIGNALS</code> is on by default, except when Catch is compiled under <code>Cygwin</code>, where it is disabled by default (but can be force-enabled by defining <code>CATCH_CONFIG_POSIX_SIGNALS</code>).</p><p><code>CATCH_CONFIG_WINDOWS_CRTDBG</code> is off by default. If enabled, Windows&#39;s CRT is used to check for memory leaks, and displays them after the tests finish running. This option only works when linking against the default main, and must be defined for the whole library build.</p><p><code>CATCH_CONFIG_WCHAR</code> is on by default, but can be disabled. Currently it is only used in support for DJGPP cross-compiler.</p><p>With the exception of <code>CATCH_CONFIG_EXPERIMENTAL_REDIRECT</code>, these toggles can be disabled by using <code>_NO_</code> form of the toggle, e.g. <code>CATCH_CONFIG_NO_WINDOWS_SEH</code>.</p><h3 id="catch-config-fast-compile" tabindex="-1"><code>CATCH_CONFIG_FAST_COMPILE</code> <a class="header-anchor" href="#catch-config-fast-compile" aria-hidden="true">#</a></h3><p>This compile-time flag speeds up compilation of assertion macros by ~20%, by disabling the generation of assertion-local try-catch blocks for non-exception family of assertion macros ({<code>REQUIRE</code>,<code>CHECK</code>}{\`\`,<code>_FALSE</code>, <code>_THAT</code>}). This disables translation of exceptions thrown under these assertions, but should not lead to false negatives.</p><p><code>CATCH_CONFIG_FAST_COMPILE</code> has to be either defined, or not defined, in all translation units that are linked into single test binary.</p><h3 id="catch-config-disable-stringification" tabindex="-1"><code>CATCH_CONFIG_DISABLE_STRINGIFICATION</code> <a class="header-anchor" href="#catch-config-disable-stringification" aria-hidden="true">#</a></h3><p>This toggle enables a workaround for VS 2017 bug. For details see <a href="./limitations.html#visual-studio-2017----raw-string-literal-in-assert-fails-to-compile">known limitations</a>.</p><h3 id="catch-config-disable" tabindex="-1"><code>CATCH_CONFIG_DISABLE</code> <a class="header-anchor" href="#catch-config-disable" aria-hidden="true">#</a></h3><p>This toggle removes most of Catch from given file. This means that <code>TEST_CASE</code>s are not registered and assertions are turned into no-ops. Useful for keeping tests within implementation files (ie for functions with internal linkage), instead of in external files.</p><p>This feature is considered experimental and might change at any point.</p><p><em>Inspired by Doctest&#39;s <code>DOCTEST_CONFIG_DISABLE</code></em></p><h2 id="enabling-stringification" tabindex="-1">Enabling stringification <a class="header-anchor" href="#enabling-stringification" aria-hidden="true">#</a></h2><p>By default, Catch does not stringify some types from the standard library. This is done to avoid dragging in various standard library headers by default. However, Catch does contain these and can be configured to provide them, using these macros:</p><pre><code>CATCH_CONFIG_ENABLE_PAIR_STRINGMAKER     // Provide StringMaker specialization for std::pair
CATCH_CONFIG_ENABLE_TUPLE_STRINGMAKER    // Provide StringMaker specialization for std::tuple
CATCH_CONFIG_ENABLE_VARIANT_STRINGMAKER  // Provide StringMaker specialization for std::variant, std::monostate (on C++17)
CATCH_CONFIG_ENABLE_OPTIONAL_STRINGMAKER // Provide StringMaker specialization for std::optional (on C++17)
CATCH_CONFIG_ENABLE_ALL_STRINGMAKERS     // Defines all of the above
</code></pre><blockquote><p><code>CATCH_CONFIG_ENABLE_VARIANT_STRINGMAKER</code> was <a href="https://github.com/catchorg/Catch2/issues/1380" target="_blank" rel="noopener noreferrer">introduced</a> in Catch2 2.4.1.</p></blockquote><blockquote><p><code>CATCH_CONFIG_ENABLE_OPTIONAL_STRINGMAKER</code> was <a href="https://github.com/catchorg/Catch2/issues/1510" target="_blank" rel="noopener noreferrer">introduced</a> in Catch2 2.6.0.</p></blockquote><h2 id="disabling-exceptions" tabindex="-1">Disabling exceptions <a class="header-anchor" href="#disabling-exceptions" aria-hidden="true">#</a></h2><blockquote><p>Introduced in Catch2 2.4.0.</p></blockquote><p>By default, Catch2 uses exceptions to signal errors and to abort tests when an assertion from the <code>REQUIRE</code> family of assertions fails. We also provide an experimental support for disabling exceptions. Catch2 should automatically detect when it is compiled with exceptions disabled, but it can be forced to compile without exceptions by defining</p><pre><code>CATCH_CONFIG_DISABLE_EXCEPTIONS
</code></pre><p>Note that when using Catch2 without exceptions, there are 2 major limitations:</p><ol><li>If there is an error that would normally be signalled by an exception, the exception&#39;s message will instead be written to <code>Catch::cerr</code> and <code>std::terminate</code> will be called.</li><li>If an assertion from the <code>REQUIRE</code> family of macros fails, <code>std::terminate</code> will be called after the active reporter returns.</li></ol><p>There is also a customization point for the exact behaviour of what happens instead of exception being thrown. To use it, define</p><pre><code>CATCH_CONFIG_DISABLE_EXCEPTIONS_CUSTOM_HANDLER
</code></pre><p>and provide a definition for this function:</p><div class="language-cpp line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">namespace</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Catch</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">[[</span><span style="color:#FFCB6B;">noreturn</span><span style="color:#89DDFF;">]]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">void</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">throw_exception</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">exception</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">const&amp;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="overriding-catch-s-debug-break-b" tabindex="-1">Overriding Catch&#39;s debug break (<code>-b</code>) <a class="header-anchor" href="#overriding-catch-s-debug-break-b" aria-hidden="true">#</a></h2><blockquote><p><a href="https://github.com/catchorg/Catch2/pull/1846" target="_blank" rel="noopener noreferrer">Introduced</a> in Catch2 2.11.2.</p></blockquote><p>You can override Catch2&#39;s break-into-debugger code by defining the <code>CATCH_BREAK_INTO_DEBUGGER()</code> macro. This can be used if e.g. Catch2 does not know your platform, or your platform is misdetected.</p><p>The macro will be used as is, that is, <code>CATCH_BREAK_INTO_DEBUGGER();</code> must compile and must break into debugger.</p><hr><p><a href="./Readme.html#top">Home</a></p>`,75),s=[n];function r(c,d,l,p,h,C){return o(),t("div",null,s)}var g=e(i,[["render",r]]);export{_ as __pageData,g as default};
