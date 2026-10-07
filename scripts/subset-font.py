"""Subset the official Noto Sans variable font for this site's three languages."""
import sys
from io import BytesIO
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

font = instantiateVariableFont(TTFont(sys.argv[1]), {"wdth": 100}, inplace=True)
buffer = BytesIO()
font.save(buffer)
buffer.seek(0)
font = TTFont(buffer)
options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["*"]
options.name_IDs = ["*"]
options.name_legacy = True
options.name_languages = ["*"]
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=list(range(0x0000, 0x0250)) + list(range(0x0400, 0x0530)) + list(range(0x2000, 0x2070)))
subsetter.subset(font)
assert all(ord(char) in font.getBestCmap() for char in "ӘәҒғҚқҢңӨөҰұҮүҺһІі")
font.flavor = "woff2"
font.save(Path("public/fonts/noto-sans-latin-cyrillic-variable.woff2"))
