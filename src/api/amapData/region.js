import { gcj02ToWgs } from '@/common/mapUtils'

const region = [
    [
        106.588191,
        29.571262
    ],
    [
        106.587288,
        29.569741
    ],
    [
        106.586792,
        29.569065
    ],
    [
        106.585804,
        29.568226
    ],
    [
        106.584919,
        29.567469
    ],
    [
        106.584129,
        29.566884
    ],
    [
        106.58294,
        29.565962
    ],
    [
        106.581666,
        29.56521
    ],
    [
        106.580094,
        29.564294
    ],
    [
        106.578428,
        29.56372
    ],
    [
        106.577057,
        29.563139
    ],
    [
        106.574619,
        29.562831
    ],
    [
        106.572477,
        29.562604
    ],
    [
        106.570336,
        29.562971
    ],
    [
        106.568203,
        29.563425
    ],
    [
        106.566946,
        29.563868
    ],
    [
        106.565784,
        29.564311
    ],
    [
        106.564535,
        29.565179
    ],
    [
        106.56367,
        29.565873
    ],
    [
        106.562222,
        29.566659
    ],
    [
        106.560869,
        29.567189
    ],
    [
        106.5599,
        29.567286
    ],
    [
        106.557862,
        29.567655
    ],
    [
        106.556502,
        29.567759
    ],
    [
        106.555236,
        29.567862
    ],
    [
        106.553582,
        29.567544
    ],
    [
        106.551823,
        29.567397
    ],
    [
        106.549881,
        29.567339
    ],
    [
        106.548123,
        29.567022
    ],
    [
        106.547049,
        29.566781
    ],
    [
        106.545395,
        29.566463
    ],
    [
        106.544606,
        29.565879
    ],
    [
        106.543039,
        29.564878
    ],
    [
        106.541956,
        29.563956
    ],
    [
        106.541064,
        29.563201
    ],
    [
        106.540666,
        29.562268
    ],
    [
        106.540257,
        29.560998
    ],
    [
        106.539851,
        29.559894
    ],
    [
        106.539255,
        29.559051
    ],
    [
        106.538951,
        29.55829
    ],
    [
        106.538456,
        29.557614
    ],
    [
        106.53766,
        29.556602
    ],
    [
        106.53668,
        29.555765
    ],
    [
        106.535789,
        29.554756
    ],
    [
        106.53392,
        29.553503
    ],
    [
        106.532067,
        29.552934
    ],
    [
        106.530405,
        29.552359
    ],
    [
        106.528949,
        29.552213
    ],
    [
        106.527296,
        29.552233
    ],
    [
        106.525547,
        29.552174
    ],
    [
        106.523512,
        29.552375
    ],
    [
        106.521669,
        29.552487
    ],
    [
        106.519142,
        29.552778
    ],
    [
        106.514606,
        29.55473
    ],
    [
        106.512131,
        29.555588
    ],
    [
        106.506765,
        29.556705
    ],
    [
        106.505605,
        29.556976
    ],
    [
        106.504203,
        29.557372
    ],
    [
        106.503996,
        29.557489
    ],
    [
        106.502342,
        29.557512
    ],
    [
        106.500334,
        29.556854
    ],
    [
        106.498586,
        29.55627
    ],
    [
        106.495523,
        29.555092
    ],
    [
        106.494042,
        29.554807
    ],
    [
        106.494215,
        29.553806
    ],
    [
        106.494484,
        29.553034
    ],
    [
        106.494415,
        29.552627
    ],
    [
        106.494103,
        29.552331
    ],
    [
        106.493185,
        29.552022
    ],
    [
        106.489343,
        29.550968
    ],
    [
        106.483612,
        29.550218
    ],
    [
        106.482191,
        29.549961
    ],
    [
        106.482001,
        29.549756
    ],
    [
        106.482097,
        29.549168
    ],
    [
        106.482789,
        29.548083
    ],
    [
        106.48472,
        29.547957
    ],
    [
        106.492842,
        29.547215
    ],
    [
        106.492868,
        29.547211
    ],
    [
        106.4956,
        29.546961
    ],
    [
        106.49663,
        29.546439
    ],
    [
        106.497313,
        29.545903
    ],
    [
        106.498265,
        29.54445
    ],
    [
        106.498689,
        29.543596
    ],
    [
        106.499164,
        29.541864
    ],
    [
        106.499054,
        29.540703
    ],
    [
        106.498689,
        29.539134
    ],
    [
        106.498879,
        29.538367
    ],
    [
        106.499338,
        29.53783
    ],
    [
        106.500619,
        29.537107
    ],
    [
        106.50319,
        29.536555
    ],
    [
        106.503362,
        29.536155
    ],
    [
        106.502929,
        29.535798
    ],
    [
        106.501857,
        29.535588
    ],
    [
        106.501527,
        29.535344
    ],
    [
        106.500714,
        29.532958
    ],
    [
        106.500601,
        29.53165
    ],
    [
        106.500982,
        29.52979
    ],
    [
        106.50202,
        29.528541
    ],
    [
        106.504211,
        29.527931
    ],
    [
        106.506253,
        29.528566
    ],
    [
        106.506599,
        29.529169
    ],
    [
        106.506789,
        29.530236
    ],
    [
        106.507109,
        29.530612
    ],
    [
        106.508702,
        29.531069
    ],
    [
        106.509456,
        29.530991
    ],
    [
        106.510736,
        29.530045
    ],
    [
        106.515307,
        29.529567
    ],
    [
        106.517331,
        29.529433
    ],
    [
        106.518353,
        29.529732
    ],
    [
        106.518672,
        29.529992
    ],
    [
        106.51895,
        29.53065
    ],
    [
        106.518387,
        29.532201
    ],
    [
        106.518613,
        29.532943
    ],
    [
        106.519599,
        29.534348
    ],
    [
        106.51997,
        29.53453
    ],
    [
        106.520768,
        29.534329
    ],
    [
        106.521166,
        29.533704
    ],
    [
        106.521236,
        29.533263
    ],
    [
        106.521504,
        29.53162
    ],
    [
        106.521893,
        29.530918
    ],
    [
        106.522662,
        29.530119
    ],
    [
        106.523166,
        29.529868
    ],
    [
        106.524914,
        29.529488
    ],
    [
        106.528428,
        29.529073
    ],
    [
        106.532281,
        29.528704
    ],
    [
        106.532611,
        29.530858
    ],
    [
        106.532921,
        29.532132
    ],
    [
        106.533433,
        29.533742
    ],
    [
        106.534525,
        29.535346
    ],
    [
        106.535226,
        29.536615
    ],
    [
        106.536204,
        29.537454
    ],
    [
        106.536897,
        29.538124
    ],
    [
        106.537788,
        29.539135
    ],
    [
        106.538473,
        29.539806
    ],
    [
        106.53946,
        29.540474
    ],
    [
        106.54024,
        29.540721
    ],
    [
        106.542778,
        29.541197
    ],
    [
        106.544232,
        29.541259
    ],
    [
        106.547826,
        29.54121
    ],
    [
        106.551034,
        29.541079
    ],
    [
        106.552783,
        29.541057
    ],
    [
        106.554439,
        29.541033
    ],
    [
        106.556188,
        29.541095
    ],
    [
        106.558918,
        29.541483
    ],
    [
        106.561163,
        29.54188
    ],
    [
        106.563113,
        29.542278
    ],
    [
        106.564865,
        29.542681
    ],
    [
        106.567214,
        29.543247
    ],
    [
        106.569745,
        29.543725
    ],
    [
        106.570822,
        29.544051
    ],
    [
        106.573266,
        29.544361
    ],
    [
        106.574722,
        29.544595
    ],
    [
        106.577074,
        29.545162
    ],
    [
        106.579121,
        29.545731
    ],
    [
        106.580301,
        29.546228
    ],
    [
        106.581968,
        29.546801
    ],
    [
        106.58373,
        29.547804
    ],
    [
        106.585013,
        29.54898
    ],
    [
        106.58621,
        29.550414
    ],
    [
        106.587009,
        29.551852
    ],
    [
        106.588103,
        29.553202
    ],
    [
        106.5891,
        29.555062
    ],
    [
        106.589613,
        29.556504
    ],
    [
        106.589927,
        29.557865
    ],
    [
        106.590447,
        29.559903
    ],
    [
        106.590482,
        29.561948
    ],
    [
        106.590499,
        29.56314
    ],
    [
        106.590613,
        29.564332
    ],
    [
        106.590544,
        29.565951
    ],
    [
        106.590275,
        29.567232
    ],
    [
        106.590187,
        29.568341
    ],
    [
        106.589718,
        29.569456
    ],
    [
        106.589345,
        29.570396
    ],
    [
        106.588191,
        29.571262
    ]
]
export const regionPath = region.map(item => {
    return gcj02ToWgs(item)
})

export const jinshan = [[106.562773, 29.564469], [106.558965, 29.564357], [106.558986, 29.562733], [106.55551, 29.562677], [106.555467, 29.561203], [106.55212, 29.561259], [106.551969, 29.555193], [106.567226, 29.554035], [106.569393, 29.554726], [106.569479, 29.561893], [106.566003, 29.562117], [106.566003, 29.563443], [106.562956, 29.564058]]
export const aoyuan = [[106.561763, 29.556467], [106.561162, 29.556803], [106.560862, 29.557121], [106.561892, 29.557363], [106.562707, 29.55783], [106.562922, 29.558054], [106.564724, 29.559211], [106.567643, 29.560462], [106.569016, 29.559771], [106.569853, 29.55867], [106.570175, 29.558278], [106.570003, 29.557587], [106.569681, 29.556859], [106.569402, 29.556561], [106.56923, 29.556299], [106.568436, 29.556467], [106.567879, 29.556262], [106.567986, 29.556094], [106.567857, 29.555758], [106.56657, 29.55559], [106.566613, 29.555291], [106.566634, 29.554078], [106.563759, 29.555497], [106.562042, 29.556169]]
