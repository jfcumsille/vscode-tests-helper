import * as vscode from 'vscode';
import { existsSync } from 'fs';

export const buildCommandForRails = async (relativeFilePath: string, context: vscode.ExtensionContext) => {
	const isSpecFile = relativeFilePath.includes('spec');
	const finalPath = isSpecFile ? relativeFilePath : await tryOtherRailsPath(relativeFilePath, context);
	if (!finalPath) {
		vscode.window.showErrorMessage('Current file is not a test file, and no path was selected from history');
		return { command: null, finalPath: null };
	}
	return { command: `bundle exec rspec ${finalPath}`, finalPath };
};

export const buildCommandForJs = async (relativeFilePath: string, context: vscode.ExtensionContext) => {
	const updateSnapshots = await vscode.window.showQuickPick(['No', 'Yes'], { placeHolder: 'Update snapshots?' });
	let command = updateSnapshots === 'Yes' ? 'npm run test:unit -- -u ' : 'npm run test:unit -- ';
	const isTestFile = relativeFilePath.includes('.test.');
	const finalPath = isTestFile ? relativeFilePath : await tryOtherJsPath(context);
	if (!finalPath) {
		vscode.window.showErrorMessage('Current file is not a test file, and no path was selected from history');
		return { command: null, finalPath: null };
	}
	return { command: command + finalPath, finalPath };
};

const tryOtherRailsPath = (relativeFilePath: string, context: vscode.ExtensionContext) => {
	const pathsHistory = context.workspaceState.get('pathsHistory', []).filter((path) => path !== null);
	if (pathsHistory.length === 0) {
		const newPath = relativeFilePath.replace('app', 'spec').replace('.rb', '_spec.rb');
		if (existsSync(newPath)) {
			return newPath;
		}
		return null;
	}
	return vscode.window.showQuickPick(pathsHistory, { placeHolder: 'Select path from history' });
};

const tryOtherJsPath = (context: vscode.ExtensionContext) => {
	const pathsHistory = context.workspaceState.get('pathsHistory', []).filter((path) => path !== null);
	if (pathsHistory.length === 0) {
		return null;
	}
	return vscode.window.showQuickPick(pathsHistory, { placeHolder: 'Select path from history' });
};