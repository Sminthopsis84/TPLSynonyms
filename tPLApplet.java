package tPLApplet;

import java.awt.*; 
import java.awt.event.*;

import javax.swing.*;
import javax.swing.border.*;
import javax.swing.BorderFactory; //doesn't work
import javax.swing.text.BadLocationException;

import java.util.*;

public class TPLApplet extends JApplet {
 /*Copyright: Sminthopsis84 2014, released under GPLv3
 * (http://www.gnu.org/licenses/gpl-3.0.html).
 *
 * Input is a text area filled with synonyms extracted from The Plant List, as well as a text box
 * with the URL from which the list was extracted.
 * Output is a synonym list formatted for addition to a Wikipedia taxobox.
 * 
 * Low-confidence names entries are omitted, unresolved names, and any listed with " sensu ", such as 
 * " sensu Ker-Gawl., non Jacq.".
 * [Illegitimate] and [Invalid] are transformed respectively into appended "nom. illeg." and "nom. inval.".
 * 
 * with the file I/O version of this program, UTF-8 encoding was needed both for gremlins
 * in the text (which can be found with BBedit -> Text -> Zap gremlins) and for
 * accented characters, which are common in botanical authority names. That doesn't appear to be needed
 *  with the applet version.
 */
	JButton jbtConvert = new JButton("Click to convert to wiki encoding");
	TwoPanels canvas = new TwoPanels();

	public TPLApplet() { //constructor for the class
		add(canvas, BorderLayout.CENTER);
		jbtConvert.setForeground(Color.BLUE); // text colour of the button
		Border paneEdge = BorderFactory.createRaisedBevelBorder();
		jbtConvert.setBorder(paneEdge);
		JPanel panel = new JPanel(new FlowLayout()); // A panel to stop the button taking up the entire width
		panel.add(jbtConvert);
		add(panel, BorderLayout.SOUTH);		
		jbtConvert.addActionListener(new ConvertListener()); //Register the listener for the Convert button
	}

	/******************************** Main method ***********************************/
	/** This main method enables the applet to run as an application, if required */
	public static void main(String[] args) {
		JFrame frame = new JFrame("TPL Synonyms Applet"); //Frame with title

		// Add an applet instance to the frame
		frame.add(new TPLApplet(), BorderLayout.CENTER);

		// Display the frame
		frame.pack(); // better than setting the size
		frame.setLocationRelativeTo(null); //Centre the frame
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
	}

	/************************ Inner class to detect button click **************************/
	class ConvertListener implements ActionListener { //Listener for the Convert button, an inner class
		@Override
		public void actionPerformed(ActionEvent e) {
			canvas.convert();
		}
	}

	/************ Inner class, a panel that contains input and output panels *****************/
	//A frame with two panels, one each for input and output
	private class TwoPanels extends JPanel { // Inner class
		String title = "Input data from The Plant List";
		JTextField text1  = new JTextField ();
		String optionText  = ""; //default value for the text input field, to be checked later
		JTextField text2  = new JTextField (optionText);
		JCheckBox collapseCheckBox = new JCheckBox("Include code to hide (collapse) the synonym list");
		JPanel p1 = new JPanel(new BorderLayout()); // Left main panel, for input
		JPanel p2 = new JPanel(new BorderLayout()); // Panel for output
		JPanel p3 = new JPanel(new BorderLayout()); // Panel to group text1, text2, and collapseCheckBox
		JTextArea inputTextArea = new JTextArea(30, 35); 
		JScrollPane scrollArea = new JScrollPane(inputTextArea); 
		JTextArea outputTextArea = new JTextArea(35, 35); //declare the output text area
		
		private TwoPanels() { //Constructor
			text1.setBorder(new TitledBorder("Enter URL from The Plant List"));
			text2.setBorder(new TitledBorder("Taxon name (optional, reminder to self)"));
			scrollArea.setBorder(new TitledBorder("Enter synonym lines from TPL"));
			p3.add(text1, BorderLayout.NORTH);
			p3.add(text2, BorderLayout.CENTER);
			p3.add(collapseCheckBox, BorderLayout.SOUTH);
			
			p1.add(p3, BorderLayout.NORTH);
			p1.add(scrollArea, BorderLayout.SOUTH);
			
			outputTextArea.setEditable(false);
			outputTextArea.setBorder(new TitledBorder("Output, Wikipedia synonym encoding"));
			p2.add(new JScrollPane(outputTextArea)); //add the scrollpane to the panel
			add(p1, BorderLayout.WEST);
			add(p2, BorderLayout.EAST);
		}
		
		public void convert() { // Method for when the Convert button is clicked
			ArrayList<String> storeLines = new ArrayList<String>(); //Store processed synonym lines for later sorting and output

			String urlString = text1.getText();
			//String taxonString = text2.getText();
			//if (optionText.equals(taxonString)) taxonString = "";
			String sReturn = inputTextArea.getText(); //limits the amount of input to 65535 bytes of UTF-8 data
			int numRows = inputTextArea.getLineCount(); //number of lines of synonyms entered

			outputTextArea.setText("|synonyms =\n"); // reinitialize the text area with the initial lines of the wikipedia encoding
			if (collapseCheckBox.isSelected()) outputTextArea.append("  {{Collapsible list |\n");
			outputTextArea.append("    {{Plainlist | style = margin-left: 1em; text-indent: -1em; |\n");

			//Process the lines of synonyms and store them
			int j = 0; int lineOffset = 0;
			for (int i=1; i<numRows; i++) {
				try {
					lineOffset = inputTextArea.getLineStartOffset(i);
					String parsedLine = parseALine(sReturn.substring(j,lineOffset));
					if (parsedLine.length() > 0) //an empty string if the input line was ignored
						//outputTextArea.append(parsedLine + "\n");
						storeLines.add(parsedLine + "\n");
					j = lineOffset;
				}
				catch (BadLocationException ex) {
					outputTextArea.append("bad location exception caught\n");
				}
			}
			String parsedLine = parseALine(sReturn.substring(lineOffset, sReturn.length())); //the last line
			if (parsedLine.length() > 0) //an empty string if the input line was ignored or was a blank line
				//outputTextArea.append(parsedLine + "\n");
 				storeLines.add(parsedLine + "\n");

			Collections.sort(storeLines); //sort in place
			
			//write out the synonym lines that were stored
			for (int i = 0; i < storeLines.size(); i++)
				outputTextArea.append(storeLines.get(i));
			
			//finish up writing the wikipedia encoding
			Calendar rightNow = Calendar.getInstance();
			int day = rightNow.get(rightNow.DAY_OF_MONTH);
			java.text.SimpleDateFormat monthFormat = new java.text.SimpleDateFormat("MMMM");
			String monthString = (monthFormat.format(rightNow.getTime()));
			int year = rightNow.get(rightNow.YEAR);
			outputTextArea.append("    }}\n");
			if (collapseCheckBox.isSelected()) outputTextArea.append("  }}\n"); //close the collapse template
			outputTextArea.append("|synonyms_ref = <ref>{{cite web\n|url=" + urlString
				+ "\n|title=The Plant List: A Working List of All Plant Species"
				+ "\n|accessdate=" + monthString + " " + day + ", " + year + "}}</ref>");
		}
		
	/************************** Subsidiary methods ******************************/
	//Parse one line of the synonyms entered
	String parseALine(String string) {
		int firstSpace = string.indexOf(' ');
		String genus = (firstSpace > 0) ? string.substring(0,firstSpace) : ""; //blank if no space found
		
		int secondSpace = string.indexOf(' ',firstSpace+1);
		String species = (secondSpace > 0) ? string.substring(firstSpace+1, secondSpace) : ""; //blank if no space found
		
		String trailingText = (secondSpace > 0) ? string.substring(secondSpace, string.length()) : "";
		if (trailingText.indexOf("Synonym") < 0) //Returns -1 if not found
			return ""; //Skip any unresolved names
		if (trailingText.indexOf("	L	") > 0)			
			return ""; //Skip any low-confidence synonyms
		if (trailingText.indexOf(" sensu ") > 0)			
			return ""; //Skip any name with a sensu attached
		
		String varString; //Look for a variety name, if any
		String trailingText1;
		int varIndex = trailingText.indexOf("var."); //Returns -1 if not found
		if (varIndex < 0) {
			varString = "";
			trailingText1 = trailingText;
		}
		else {
			int spaceBeforeVarName = trailingText.indexOf(' ', varIndex);
			int spaceAfterVarName = trailingText.indexOf(' ', spaceBeforeVarName + 1);
			varString = "\'\' var. \'\'" + trailingText.substring(spaceBeforeVarName + 1, spaceAfterVarName);
			trailingText1 = trailingText.substring(spaceAfterVarName, trailingText.length());
		}
		
		return "*\'\'" + genus + " " + species + varString + "\'\' <small>" 
			+ parseTrailingText(trailingText1.trim());
	}
		
	/* Split the string at the tab character and throw away most of the rest, but
	 * detect "[Invalid]" and "[Illegitimate]" before the tab if present and replace them
	 * with appended "nom. inval." or "nom. illeg." as appropriate */
	 String parseTrailingText(String string) {
		int tabIndex = string.indexOf('\t'); //returns -1 if no tab character found
		int invalIndex = string.indexOf("[Invalid]"); //returns -1 if not found
		int illegIndex = string.indexOf("[Illegitimate]"); //returns -1 if not found
		String appendString = (invalIndex > 0) ? " nom. inval." //to be appended later (can be an empty string)
			: (illegIndex > 0) ? " nom. illeg." : "";	

		//Split the text at the tab character or at [Illegitimate] or [Invalid]
		int truncIndex = minOfThree(tabIndex, invalIndex, illegIndex);
		return (truncIndex >= 0)
			? string.substring(0,truncIndex).trim() + "</small>" + appendString
			: string + "</small>" + appendString;
		}

	/* Service method for parseTrailingText, the minimum non-negative value of three parameters, if
	 * there is such a non-negative value
	 * (-1, an error code that could be passed here, is to be discarded in favour of the other values) */
	int minOfThree(int x, int y, int z) {
		return minOfTwo(x, minOfTwo(y,z));
		}

	//Service method for minOfThree, to process two values at a time
	int minOfTwo(int x, int y) {
		if (x < 0)
			return y;
		else if (x < y || (y < 0))
			return x;
		else		
			return y;
		}
	}
}
