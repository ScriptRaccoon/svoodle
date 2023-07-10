type svoodleSubmission = {
	title: string;
	description: string;
	options: string[];
};

type vote = {
	name: string;
	choices: boolean[];
};

type voteSubmission = { id: string } & vote;

interface Timestamp {
	toDate: () => Date;
}

type svoodleData = svoodleSubmission & {
	votes: vote[];
	created: Timestamp;
};
