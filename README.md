TPLSynonyms
===========

This program produces code for a synonym list that can be inserted into a Wikipedia taxobox,
derived from text copied and pasted from www.theplantlist.org.

Licensed under the MIT license 2014 by Peter Coxhead and Sminthopsis84.

The source code consists of an HTML file tPLSynonyms.html and a javascript source file convertTPL.js
The files are available at https://github.com/Sminthopsis84/TPLSynonyms
downloadable as a ZIP archive, along with this readme.md, license.md, and the original tPLApplet.java source
on which the html-javascript version is based.

When tPLSynonyms.html and convertTPL.js are in the same directory (folder) on the user's computer, open
tPLSynonyms.html in a browser window, and the program executes interactively.

#Usage
For example, for Sisyrinchium acre H.Mann, at http://www.theplantlist.org/tpl1.1/record/kew-324946
the database lists Bermudiana acris (H.Mann) Kuntze as a synonym with high confidence level.
Paste the URL and the copied text into the URL box and input boxes respectively. The text could be, e.g.:

```
Name Status Confidence level Source Date supplied
Bermudiana acris (H.Mann) Kuntze Synonym *** iPlants 2012-03-23
```

The program discards lines that don't contain the word "Synonym", any with low confidence, and any that
contain the word "sensu", which indicates (mis)use of a plant name, rather than establishment of a name.

It optionally includes Wikipedia
code to hide (collapse) the synonym list. The program has a help page accessible by clicking a button.

#A more complex example
A Wikipedian might wish to make a page about a species for which The Plant List
has separate synonym lists for infraspecific taxa. For example, the synonym list text from
Sisyrinchium arenarium and Sisyrinchium arenarium subsp. adenostemon can be pasted together as input to the program,
which will sort the two lists together. The URL for the citation could be listed as:

```
http://www.theplantlist.org/tpl1.1/search?q=Sisyrinchium+arenarium
```

and the input text (as of July 2014):

```
Name Status Confi­dence level Source Date supplied
Sisyrinchium adenostemon Phil. Synonym H iPlants 2012-03-23
Sisyrinchium pauperculum Phil. Synonym H iPlants 2012-03-23

Name Status Confi­dence level Source Date supplied
Bermudiana humilis (Phil.) Kuntze Synonym H iPlants 2012-03-23
Bermudiana nervosa (Phil.) Kuntze Synonym H iPlants 2012-03-23
Sisyrinchium adenostemon subsp. microspathum (Phil.) Ravenna Synonym L iPlants 2012-03-23
Sisyrinchium angustifolium Phil. [Illegitimate] Synonym H iPlants 2012-03-23
Sisyrinchium arenarium subsp. arenarium Synonym L iPlants 2012-03-23
Sisyrinchium arenarium subsp. microspathum (Phil.) Ravenna Synonym L iPlants 2012-03-23
Sisyrinchium flexuosum Phil. [Illegitimate] Synonym H iPlants 2012-03-23
Sisyrinchium flexuosum Lindl. [Illegitimate] Synonym H iPlants 2012-03-23
Sisyrinchium humile Phil. Synonym H iPlants 2012-03-23
Sisyrinchium microspathum Phil. Synonym H iPlants 2012-03-23
Sisyrinchium multiflorum Phil. [Illegitimate] Synonym H iPlants 2012-03-23
Sisyrinchium nervosum Phil. Synonym H iPlants 2012-03-23
Sisyrinchium nervosum subsp. atrichum Ravenna Synonym L iPlants 2012-03-23
Sisyrinchium oligostachyum Phil. Synonym H iPlants 2012-03-23
Sisyrinchium striatum var. microspathum (Phil.) Speg. Synonym L iPlants 2012-03-23
```

The output appears as:

```
|synonyms =
  {{Collapsible list |
    {{Plainlist | style = margin-left: 1em; text-indent: -1em; |
*''Bermudiana humilis'' <small>(Phil.) Kuntze</small>
*''Bermudiana nervosa'' <small>(Phil.) Kuntze</small>
*''Sisyrinchium adenostemon'' <small>Phil.</small>
*''Sisyrinchium angustifolium'' <small>Phil.</small> nom. illeg.
*''Sisyrinchium flexuosum'' <small>Lindl.</small> nom. illeg.
*''Sisyrinchium flexuosum'' <small>Phil.</small> nom. illeg.
*''Sisyrinchium humile'' <small>Phil.</small>
*''Sisyrinchium microspathum'' <small>Phil.</small>
*''Sisyrinchium multiflorum'' <small>Phil.</small> nom. illeg.
*''Sisyrinchium nervosum'' <small>Phil.</small>
*''Sisyrinchium oligostachyum'' <small>Phil.</small>
*''Sisyrinchium pauperculum'' <small>Phil.</small>
    }}
  }}
|synonyms_ref = <ref>{{cite web
|url=http://www.theplantlist.org/tpl1.1/search?q=Sisyrinchium+arenarium
|title=The Plant List: A Working List of All Plant Species
|accessdate=8 July 2014}}</ref>
```
