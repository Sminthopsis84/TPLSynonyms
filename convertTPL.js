/* Conversion code by Peter Coxhead, based on Sminthopsis84's Java source;

 See below for IO routines written by Peter Coxhead

 Copyright: Peter Coxhead, 2008 and 2014; released under GPLv3

 Subsequent code by Sminthopsis84 copyright 2014, released under GPLv3

  (http://www.gnu.org/licenses/gpl-3.0.html).



 Last Revision: 8 July 2014

*/




//Note the lack of semi-colons at the end of the lines after the first

function helpTPLSynonyms()

{OpenWindow=window.open("", "newwin", "height=650, width=800,toolbar=no,scrollbars=yes,menubar=no");

   OpenWindow.document.write("<TITLE>Convert TPL Synonym lists for Wikipedia</TITLE>")

   OpenWindow.document.write("<BODY BGCOLOR=pink>")

   OpenWindow.document.write("<h1>Help Page for TPLSynonyms.html</h1>")

   OpenWindow.document.write("<p>This program produces code for a synonym list that can be inserted into a Wikipedia taxobox, ")

   OpenWindow.document.write("derived from text copied and pasted from www.theplantlist.org. ")

   OpenWindow.document.write("It optionally includes Wikipedia code to hide (collapse) the synonym list.</p>")

   OpenWindow.document.write("<p>For example, for <i>Sisyrinchium acre</i> H.Mann, at http://www.theplantlist.org/tpl1.1/record/kew-324946</br>")

   OpenWindow.document.write("the database lists ")

   OpenWindow.document.write("<i>Bermudiana acris</i> (H.Mann) Kuntze as a synonym with high confidence level.</p>")

   OpenWindow.document.write("Paste the URL and the copied text into the URL box and input boxes respectively. The text could be, e.g.:")

   OpenWindow.document.write("<br/><br/>Name&#9Status&#9Confidence level&#9Source&#9Date supplied")

   OpenWindow.document.write("<br/>Bermudiana acris (H.Mann) Kuntze&#9Synonym&#9***&#9iPlants&#9 2012-03-23")

   OpenWindow.document.write('<br/><br/>The program discards lines that don\'t contain the word "Synonym", ')

   OpenWindow.document.write('any with low confidence, and any that contain the word "sensu", which indicates ')

   OpenWindow.document.write('(mis)use of a plant name, rather than establishment of a name.')

   OpenWindow.document.write('<br/><br/>For a more complex example, a Wikipedian might wish to make a page about a species for which ')

   OpenWindow.document.write('The Plant List has separate synonym lists for infraspecific taxa. For example, ')

   OpenWindow.document.write('the synonym list text from <i>Sisyrinchium arenarium</i> and <i>Sisyrinchium arenarium</i> subsp. <i>adenostemon</i> ')

   OpenWindow.document.write('can be pasted together as input to the program, which will sort the two lists ')

   OpenWindow.document.write('together. The URL for the citation could be listed as:')

   OpenWindow.document.write('<br/>http://www.theplantlist.org/tpl1.1/search?q=Sisyrinchium+arenarium')

   OpenWindow.document.write('<br/>and the input text (as of July 2014):')

   OpenWindow.document.write('<br/><br/>Name	Status	Confi­dence level	Source	Date supplied')

   OpenWindow.document.write('<br/>Sisyrinchium adenostemon Phil.	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium pauperculum Phil.	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/><br/>Name	Status	Confi­dence level	Source	Date supplied')

   OpenWindow.document.write('<br/>Bermudiana humilis (Phil.) Kuntze	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Bermudiana nervosa (Phil.) Kuntze	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium adenostemon subsp. microspathum (Phil.) Ravenna	Synonym	L	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium angustifolium Phil. [Illegitimate]	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium arenarium subsp. arenarium	Synonym	L	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium arenarium subsp. microspathum (Phil.) Ravenna	Synonym	L	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium flexuosum Phil. [Illegitimate]	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium flexuosum Lindl. [Illegitimate]	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium humile Phil.	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium microspathum Phil.	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium multiflorum Phil. [Illegitimate]	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium nervosum Phil.	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium nervosum subsp. atrichum Ravenna	Synonym	L	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium oligostachyum Phil.	Synonym	H	iPlants	2012-03-23')

   OpenWindow.document.write('<br/>Sisyrinchium striatum var. microspathum (Phil.) Speg.	Synonym	L	iPlants	2012-03-23')




   OpenWindow.document.write("</BODY>")

   OpenWindow.document.write("</HTML>")

   OpenWindow.document.close()

   self.name="main"

}




function convertTPL()

{ var urlString = document.getElementById("urlEntered").value;

  var hideSynonyms = document.getElementById("hideSynonymsBox");

  var sReturn = inputTextArea.value;

  var lines = sReturn.split('\n');                          // split into lines

  var numRows = lines.length;

  for (var i=0; i<numRows; i++) lines[i] = lines[i].trim(); // remove leading and trailing whitespace




  lines.sort();

  

// Write the output

  writeln('|synonyms =');

  if (hideSynonyms.checked) //add the start of the wikipedia template to hide (collapse) the synonyms list

    writeln('  {{Collapsible list |');

  writeln('    {{Plainlist | style = margin-left: 1em; text-indent: -1em; |'); // wikipedia encoding

  

  for (var i=0; i<numRows; i++)

  { var parsedLine = parseALine(lines[i]);

    if (parsedLine.length > 0) //an empty string if the input line was ignored

	   writeln(parsedLine);

  }

  

//finish up writing the wikipedia encoding

  writeln('    }}'); //close the wikipedia Plainlist template

  if (hideSynonyms.checked) writeln('  }}'); //close the wikipedia Collapse template

  writeln('|synonyms_ref = &#60;ref>{{citation');

  writeln ('|url=' + urlString);

  writeln ('|title=The Plant List: A Working List of All Plant Species');

  var d = new Date();

  writeln ('|accessdate=' + d.getUTCDate() + ' ' + month[d.getUTCMonth()] + ' '

     + d.getUTCFullYear() + '}}&#60;/ref>');

  

  //writeln('***Convert terminated.'); 

}




function parseALine(line)

{ var firstSpace = line.indexOf(' ');

  var genus = (firstSpace > 0) ? line.substring(0,firstSpace) : ""; //blank if no space found

  var secondSpace = line.indexOf(' ',firstSpace+1);

  var isHybrid = ((secondSpace > 0) & (line.substring(firstSpace+1, firstSpace+3) == "× "));

  var multi = isHybrid ? "''× ''" : "";

  var thirdSpace = isHybrid ? line.indexOf(' ',secondSpace+1) : secondSpace;

  var species = isHybrid ? line.substring(secondSpace+1, thirdSpace) : line.substring(firstSpace+1, secondSpace); //blank if no space found

  var trailingText = (thirdSpace > 0) ? line.substring(thirdSpace, line.length) : "";

  if (trailingText.indexOf("Synonym") < 0) //Returns -1 if not found

   return ""; //Skip any unresolved names

  if (trailingText.indexOf("	L	") > 0)			

    return ""; //Skip any low-confidence synonyms

  if (trailingText.indexOf(" sensu ") > 0)			

    return ""; //Skip any name with a sensu attached

    

  var varString; //Look for a variety name, if any

  var trailingText1;

  var varIndex = trailingText.indexOf("var."); //Returns -1 if not found

  

  if (varIndex < 0) {

  

 varString = "";

  

 trailingText1 = trailingText;

  

  }

  else {

    var spaceBeforeVarName = trailingText.indexOf(' ', varIndex);

    var spaceAfterVarName = trailingText.indexOf(' ', spaceBeforeVarName + 1);

    varString = "'' var. ''" + trailingText.substring(spaceBeforeVarName + 1, spaceAfterVarName);

    trailingText1 = trailingText.substring(spaceAfterVarName, trailingText.length);

  }




  return "*''" + genus + " " + multi + species + varString + "'' &#60;small>"

    + parseTrailingText(trailingText1.trim());

}




// Split the string at the tab character and throw away most of the rest, but

// detect "[Invalid]" and "[Illegitimate]" before the tab if present and replace them

// with appended "nom. inval." or "nom. illeg." as appropriate 

function parseTrailingText(string)

{ var tabIndex = string.indexOf('\t'); //returns -1 if no tab character found

  var invalIndex = string.indexOf("[Invalid]"); //returns -1 if not found

  var illegIndex = string.indexOf("[Illegitimate]"); //returns -1 if not found

  var appendString = (invalIndex > 0) ? " nom. inval." //to be appended later (can be an empty string)

			: (illegIndex > 0) ? " nom. illeg." : "";	




  //Split the text at the tab character or at [Illegitimate] or [Invalid]

  var truncIndex = minOfThree(tabIndex, invalIndex, illegIndex);

  return (truncIndex >= 0) ? string.substring(0,truncIndex).trim() + "&#60;/small>" + appendString

			: string + '&#60;/small>' + appendString;

}




// Service method for parseTrailingText, the minimum non-negative value of three parameters, if

// there is such a non-negative value

// (-1, an error code that could be passed here, is to be discarded in favour of the other values) 

function minOfThree(x, y, z)

{ return minOfTwo(x, minOfTwo(y,z));

}




//Service method for minOfThree, to process two values at a time

function minOfTwo(x, y)

{ if (x < 0) return y;

  else if (x < y || (y < 0)) return x;

  else	return y;

}




/* ========================= IO Utilities ==========================



Description: Javascript routines to 'write' to web pages.

Author: Peter Coxhead (http://www.cs.bham.ac.uk/~pxc/)

Copyright: Peter Coxhead, 2008; released under GPLv3

  (http://www.gnu.org/licenses/gpl-3.0.html).

Last Revision: 15 Dec 2008

*/

var version = 'IOUtils 1.01';

/*



- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



The first call must be to startOutput(obj,msg). Subsequent calls

to 'output' functions add to the output buffer. The last call must

be to endOutput(). This displays the buffer in the innerHTML field

of obj. The string msg is shown until endOutput() is executed.



startOutput(obj,msg): initializes the output buffer and sets up

  obj.innerHTML as the ultimate destination of the output. The

  string msg will be shown until endOutput is called.

endOutput(): puts the output buffer in the HTML object set

  up by startOutput.



write(msg): adds the string msg to the output buffer.

writeln(msg): adds the string msg to the output buffer, followed

  by a line break.

print is a synonym of write.

println is a synonym of writeln.

nl(): adds a line break to the output buffer.



startTable(): starts a new table in the output buffer.

endTable(): ends a new table in the output buffer.

newRow(): starts a new row in a table.

writeCell(msg): puts the string msg into a single table cell.



displayMat(m,colLab,rowLab,dp): adds the 2D array m as a table to

  the output buffer. The arguments colLab and rowLab, if not null,

  must be arrays of strings to serveas the column and row labels.

  If dp is not null, it defines the number of decimal places

  shown; the default is 3.



displayAT(t): adds the tree t, which must be in array

 representation, to the output buffer.

 An example of a tree in array representation is [1,[2,3]].

 

IOUtils.js also adds an additional method to the Number object.

fixed(w,d): returns a number in fixed point notation as a 

  string of at least w characters 'wide' with d decimal places.



*/




var IOUtils = {version: version};




// Globals for the output.

var _outputObj;

var _outputBuffer;




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Variables which determine how text is output.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//var LFT = '<span style="white-space: pre; font-family: monospace">';

//var RGT = '</span>';

var LFT = '';

var RGT = '';




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// startOutput(obj,msg): initializes the output buffer and sets up

//   obj.innerHTML as the ultimate destination of the output. The

//   string msg will be shown until endOutput is called.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function startOutput(obj,msg)

{ _outputObj = obj;

  _outputBuffer = '';

  _outputObj.innerHTML = msg;

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// endOutput(): puts the output buffer in the HTML object set

//  up by startOutput.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function endOutput()

{ _outputObj.innerHTML = _outputBuffer;

  _outputBuffer = '';

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// write(msg): adds the string msg to the output buffer.

// print is a synonym of write.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function write(msg)

{ _outputBuffer += (LFT+msg+RGT);

}

var print = write;




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// writeln(msg): adds the string msg to the output buffer, followed

//   by a line break.

// println is a synonym of writeln.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function writeln(msg)

{ _outputBuffer += (LFT+msg+RGT+'\n');

}

var println = writeln;




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// nl(): adds a line break to the output buffer.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function nl()

{ _outputBuffer += ('<br />');

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// startTable(): starts a new table in the output buffer.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var _rowStarted = false;

function startTable()

{ _outputBuffer += '<table border="1"><tr>';

  _rowStarted = true;

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// endTable(): ends a new table in the output buffer.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function endTable()

{ if(_rowStarted)

  { _outputBuffer += '</tr>';

    _rowStarted = false;

  }

  _outputBuffer += '</table>';

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// newRow(): starts a new row in a table.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function newRow()

{ _outputBuffer += '</tr>';

  _rowStarted = false;

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// writeCell(msg): puts the string msg into a single table cell.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function writeCell(msg)

{ if(!_rowStarted)

  { _outputBuffer += '<tr>';

    _rowStarted = true;

  }

  _outputBuffer += ('<td style="text-align: right;">'+LFT+msg+RGT+'</td>');

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// displayMat(m,colLab,rowLab,dp): adds the 2D array m as a table to

//   the output buffer. The arguments colLab and rowLab, if not null,

//   must be arrays of strings to serveas the column and row labels.

//   If dp is not null, it defines the number of decimal places

//   shown; the default is 3.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function displayMat(m,colLab,rowLab,dp)

{ startTable();

  if (colLab != null)

  { writeCell('');

    for(var j=0; j<colLab.length; j++) writeCell(colLab[j]);

    newRow();

  }

  if (dp == null) dp = 3;

  for(var i=0; i<m.length; i++)

  { if(rowLab != null) writeCell(rowLab[i]);

    for(var j=0; j<m[i].length; j++)

    { writeCell(m[i][j].toFixed(dp));

    }

    newRow();

  }

  endTable();

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Trees can be represented in Javacript by arrays, e.g. [1,[2,3]].

// displayAT(t): adds the tree t, which must be in array

//  representation, to the output buffer.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function displayAT(t)

{ if(!(t instanceof Array))

  { write(t);

  }

  else if(t.length == 2)

  { write('(');displayAT(t[0]);write(', ');displayAT(t[1]);write(')');

  }

  else alert('***ERROR: displayAT given an array of length '+t.length);

}




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Additional method for the Number object.

// fixed(w,d): returns a number in fixed point notation as a string

//   of at least w in width with d decimal places.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Number.prototype.fixed = function (w,d)

{ var s = this.toFixed(d);

  var t ='';

  for (var i = 0; i < w - s.length; i++) t += ' ';

  return t+s;

}
