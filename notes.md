Outside of jest I ran the httpbun test and got the following error output:
```
an error has occurred: RDF parsing failed: none of the configured parsers were able to handle the media type text/octet-stream for http://httpbun.com/drip?duration=5
Error messages of failing actors:
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
node:events:496
throw er; // Unhandled 'error' event
^

Error: Fetch timed out for http://httpbun.com/drip?duration=5 after 5000 ms
at timeoutCallback (C:\Users\noahv\Documents\comunica-test\node_modules\@comunica\actor-http-fetch\lib\ActorHttpFetch.js:41:59)
at Timeout._onTimeout (C:\Users\noahv\Documents\comunica-test\node_modules\@comunica\actor-http-fetch\lib\ActorHttpFetch.js:42:46)
at listOnTimeout (node:internal/timers:594:17)
at process.processTimers (node:internal/timers:529:7)
Emitted 'error' event on ReadableFromWeb instance at:
at emitErrorNT (C:\Users\noahv\Documents\comunica-test\node_modules\readable-stream\lib\internal\streams\destroy.js:126:8)
at emitErrorCloseNT (C:\Users\noahv\Documents\comunica-test\node_modules\readable-stream\lib\internal\streams\destroy.js:98:3)
at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
```

A caught error (the one preceded by an "error has occurred:") and an uncaught error appear (the one starting with node:events:496).

The uncaught one seems to be the same as mentioned in the issue, the caught error is not mentioned, probably because it's irrelevant.

Then when I ran it the httpbun test inside comunica using jest, I got the following output:

```
Error: RDF parsing failed: none of the configured parsers were able to handle the media type text/octet-stream for http://httpbun.com/drip?duration=5
Error messages of failing actors:
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream
Unrecognized media type: text/octet-stream

    at TestResultFailed.getOrThrow (C:\Users\noahv\Documents\comunica\packages\core\lib\TestResult.ts:170:11)
    at MediatorRace.mediate (C:\Users\noahv\Documents\comunica\packages\core\lib\Mediator.ts:107:21)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ActorDereferenceRdfParse.run (C:\Users\noahv\Documents\comunica\packages\bus-dereference\lib\ActorDereferenceParse.ts:102:19)
    at async TestResultPassed.mapAsync (C:\Users\noahv\Documents\comunica\packages\core\lib\TestResult.ts:127:41)
    at async MediatorRace.mediate (C:\Users\noahv\Documents\comunica\packages\core\lib\Mediator.ts:106:22)
    at async QuerySourceHypermedia.getSource (C:\Users\noahv\Documents\comunica\packages\actor-query-source-identify-hypermedia\lib\QuerySourceHypermedia.ts:178:66)
    at async QuerySourceHypermedia.getSelectorShape (C:\Users\noahv\Documents\comunica\packages\actor-query-source-identify-hypermedia\lib\QuerySourceHypermedia.ts:76:20)
    at async ActorOptimizeQueryOperationAssignSourcesExhaustive.run (C:\Users\noahv\Documents\comunica\packages\actor-optimize-query-operation-assign-sources-exhaustive\lib\ActorOptimizeQueryOperationAssignSourcesExhaustive.ts:40:25)
    at async MediatorCombinePipeline.mediate (C:\Users\noahv\Documents\comunica\packages\mediator-combine-pipeline\lib\MediatorCombinePipeline.ts:83:32)
    at async ActorQueryProcessSequential.optimize (C:\Users\noahv\Documents\comunica\packages\actor-query-process-sequential\lib\ActorQueryProcessSequential.ts:109:31)
    at async ActorQueryProcessSequential.run (C:\Users\noahv\Documents\comunica\packages\actor-query-process-sequential\lib\ActorQueryProcessSequential.ts:56:31)
    at async TestResultPassed.mapAsync (C:\Users\noahv\Documents\comunica\packages\core\lib\TestResult.ts:127:41)
    at async MediatorRace.mediate (C:\Users\noahv\Documents\comunica\packages\core\lib\Mediator.ts:106:22)
    at async QueryEngine.queryOrExplain (C:\Users\noahv\Documents\comunica\packages\actor-init-query\lib\QueryEngineBase.ts:135:24)
    at async QueryEngine.query (C:\Users\noahv\Documents\comunica\packages\actor-init-query\lib\QueryEngineBase.ts:91:20)
    at async QueryEngine.queryOfType (C:\Users\noahv\Documents\comunica\packages\actor-init-query\lib\QueryEngineBase.ts:74:20)
    at async Object.<anonymous> (C:\Users\noahv\Documents\comunica\engines\query-sparql\test\QuerySparql-test.ts:1714:32)
```

So I'm guessing the fact that there's no fetch timeout is jest's fault, but that does make it pretty annoying to test.

Apart from this, there's also a few other annoying things (like the test being pretty long and not persistent, since it relies so much on a third party: httpbun.com/drip).

So I was looking on making a mock fetch that does something like httpbun.com/drip but with a different media type.

I tried a lot of things, looked through the source code of httpbun.com, asked chatgpt, jitse and ruben, but still couldn't replicate it.
See: [QuerySparql-test.ts](https://github.com/noahvsb/comunica/blob/9979e0c76df268ad25c73c9f59b5c2946dd0a4d3/engines/query-sparql/test/QuerySparql-test.ts#L1629)

I have no idea why my multiple test variants aren't failing, it could be that the body timeout doesn't work, because I can't find any other reason for the tests not failing.

But then it doesn't explain that the httpbun.com has a timeout, so I'm stumped. I haven't even started working on trying to fix it, because I have no idea what's causing it.
