import * as editorconfig from 'editorconfig';
import {
	EndOfLine,
	TextEdit
} from 'vscode';

import PreSaveTransformation from './PreSaveTransformation';

class SetEndOfLine extends PreSaveTransformation {

	private eolMap = {
		LF: EndOfLine.LF,
		CRLF: EndOfLine.CRLF
	};

	transform(
		editorconfig: editorconfig.knownProps
	) {
		const eolKey = (editorconfig.end_of_line || '').toUpperCase();
		const eol = this.eolMap[eolKey];

		return (eol) ? {
			edits: [ TextEdit.setEndOfLine(eol) ],
			message: `setEndOfLine(${eolKey})`
		} : { edits: [] };
	}
}

export default SetEndOfLine;
