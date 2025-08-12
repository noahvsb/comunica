# Comunica Query Source Skolemize Optimize Query Operation Actor

[![npm version](https://badge.fury.io/js/%40comunica%2Factor-context-preprocess-query-source-skolemize.svg)](https://www.npmjs.com/package/@comunica/actor-context-preprocess-query-source-skolemize)

An [Optimize Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-optimize-query-operation) actor
that places all identified query sources in a skolemization wrapper.
This ensures that blank nodes are deterministically available as IRIs,
and that blank nodes across multiple sources with shared do not get confused.

This module is part of the [Comunica framework](https://github.com/comunica/comunica),
and should only be used by [developers that want to build their own query engine](https://comunica.dev/docs/modify/).

[Click here if you just want to query with Comunica](https://comunica.dev/docs/query/).

## Install

```bash
$ yarn add @comunica/actor-optimize-query-operation-query-source-skolemize
```

## Configure

After installing, this package can be added to your engine's configuration as follows:
```text
{
  "@context": [
    ...
    "https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-optimize-query-operation-query-source-skolemize/^1.0.0/components/context.jsonld"
  ],
  "actors": [
    ...
    {
      "@id": "urn:comunica:default:optimize-query-operation/actors#query-source-skolemize",
      "@type": "ActorContextPreprocessQuerySourceSkolemize"
    }
  ]
}
```
