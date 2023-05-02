import * as vscode from 'vscode';
import { buildCommandForJs, buildCommandForRails } from './commandBuilders';
import { isLenguageSupported, shouldUseDoppler } from './utils';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-tests-helper.runTests', async () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showErrorMessage('No active editor found!');
			return;
		}
		
		const relativeFilePath = activeEditor.document.uri.fsPath;
		let { command, finalPath } = await buildComnand(relativeFilePath, context);
		if (!command) {
			return;
		}
		command = await shouldUseDoppler() ? `doppler run -- ${command}` : command;
		
		const currentHistory = context.workspaceState.get('pathsHistory', [null, null, null, null, null]);
		const newHistory = [finalPath, ...currentHistory.filter((path) => path !== finalPath)].slice(0, 5);
		context.workspaceState.update('pathsHistory', newHistory);
		const terminal = vscode.window.createTerminal('Tests Helper');
		terminal.show();
		terminal.sendText(command);
		vscode.window.showInformationMessage('Running tests!');
	});

	context.subscriptions.push(disposable);
}

const buildComnand = async (relativeFilePath: string, context: vscode.ExtensionContext) => {
	if (!isLenguageSupported(relativeFilePath)) {
		vscode.window.showErrorMessage('Unsupported file type');
		return { command: null, finalPath: null };
	}
	return relativeFilePath?.endsWith('.rb') ? buildCommandForRails(relativeFilePath, context) : buildCommandForJs(relativeFilePath, context);
};



export function deactivate() {}
