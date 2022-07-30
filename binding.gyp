{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "OMPEval/omp",
        "/opt/homebrew/Cellar/boost/1.79.0_1/include/"
      ],
      "libraries":[
        "../OMPEval/lib/ompeval.a"
      ],
      'cflags_cc': [ '-fexceptions', '-fPIC' ],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
          }
        }]
      ]
    }
  ]
}