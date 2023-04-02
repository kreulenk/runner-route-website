import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export default class UserUtils {
	static CLIENT_ID: string = '41p4agtsookev17mobo88urbt';
	static cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });

	/*
		Returns a message with how a password lacks complexity per the rules defined by the Cognito User pool. If there are no issues, false is returned
	*/
	static findIssueWithPasswordComplexity(password: string) {
	    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
	    const hasUpperCaseRegex:RegExp = new RegExp('[A-Z]');
	    const hasLowerCaseRegex:RegExp = new RegExp('[a-z]');
	    const hasNumbersRegex:RegExp = new RegExp('\\d');
	    const hasSpecialCharacterRegex:RegExp = new RegExp('\\W');

	    if (!hasUpperCaseRegex.test(password)) return 'Your new password requires at least 1 upper case character';
	    if (!hasLowerCaseRegex.test(password)) return 'Your new password requires at least 1 lower case character';
	    if (!hasNumbersRegex.test(password)) return 'Your new password requires at least 1 number';
	    if (!hasSpecialCharacterRegex.test(password)) return 'Your new password requires at least 1 special character';
	    if (password.length < 8) return 'Your new password must be at least 8 characters in length';
	    return false; // If no issues were found, return false
	};
}
