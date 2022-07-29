{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "OMPEval/omp"
      ],
      "libraries":[
        "../OMPEval/lib/ompeval.a"
      ],
      'cflags_cc': [ '-fexceptions', '-fPIC' ],
    }
  ]
}