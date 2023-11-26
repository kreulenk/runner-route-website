import { CognitoIdentityProviderClient, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";

export default class UserUtils {
	static CLIENT_ID = '33fks8ji8v5oahk5dq27jqkj0a';
	static cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });

	/*
		Returns a message with how a password lacks complexity per the rules defined by the Cognito User pool. If there are no issues, false is returned
	*/
	static findIssueWithPasswordComplexity(password: string) {
		const hasUpperCaseRegex = new RegExp('[A-Z]');
		const hasLowerCaseRegex = new RegExp('[a-z]');
		const hasNumbersRegex = new RegExp('\\d');
		const hasSpecialCharacterRegex = new RegExp('\\W');

		if (!hasUpperCaseRegex.test(password)) return 'Your new password requires at least 1 upper case character';
		if (!hasLowerCaseRegex.test(password)) return 'Your new password requires at least 1 lower case character';
		if (!hasNumbersRegex.test(password)) return 'Your new password requires at least 1 number';
		if (!hasSpecialCharacterRegex.test(password)) return 'Your new password requires at least 1 special character';
		if (password.length < 8) return 'Your new password must be at least 8 characters in length';
		return false; // If no issues were found, return false
	}

	static async setUserInfo(accessToken: string) {
		const getUserResponse = await UserUtils.cognitoClient.send(new GetUserCommand({ AccessToken: accessToken }));
		getUserResponse.UserAttributes?.forEach(attribute => { // Set preferred username and other attrs
			localStorage.setItem(attribute.Name as string, attribute.Value as string);
		});
	}
}
