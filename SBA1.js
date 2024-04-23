const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
 
 
  
  //==========================================================================================================================//
  /*function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);*/
//==========================================================================================================================//
// Function to calculate penalty for late submissions
function calculateLatePenalty(submissionDate, dueDate, pointsPossible) {
    const submissionTimestamp = new Date(submissionDate).getTime();
    const dueTimestamp = new Date(dueDate).getTime();
    if (submissionTimestamp > dueTimestamp) 
        /* if (duetimestamp >= submissiontimestamp)
        {return 0;}
        return Math.floor(pointsPossible * 0.1);
        */
        {
        return Math.floor(pointsPossible * 0.1);
        }
    return 0;
  }
// Function to calculate score percentage less the late penalty 
  function calculateScorePercentage(score, pointsPossible, latePenalty) {
    const adjustedScore = Math.max(0, score - latePenalty);
    return adjustedScore / pointsPossible;
  
  }
  /* 
  calculateScorePercentage(48, 50, 5) {
    const adjustedScore = Math.max(0, 48 - 5);
    return adjustedScore / pointsPossible;
  }
  */



// Function to get the Laerner's data using given parameters  
// Function to get the Learner's data using given parameters  
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) 
{
    const learners = {};
    const learnersMap = {};

    //Define construct 'submission' 
    //Also displays error message when Assignment ID is not in the list of data provided
//@@ -154,9 +154,9 @@ function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
        const latePenalty = calculateLatePenalty(submission.submission.submitted_at, assignment.due_at, assignment.points_possible);
        const scorePercentage = calculateScorePercentage(submission.submission.score, assignment.points_possible, latePenalty);

        if (!learners[submission.learner_id]) 
        if (!learnersMap[submission.learner_id]) 
        {
            learners[submission.learner_id] = {
            learnersMap[submission.learner_id] = {
                id: submission.learner_id,
                totalScore: 0,
                totalPossibleScore: 0,
//@@ -166,15 +166,32 @@ function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
            };
        }



    }
        const learner = learnersMap[submission.learner_id];
        learner.totalScore += submission.submission.score;
        learner.totalPossibleScore += assignment.points_possible;
        learner.totalWeightedScore += scorePercentage * AssignmentGroup.group_weight;
        learner.totalWeight += AssignmentGroup.group_weight;
        learner.assignments[assignment.id] = scorePercentage;
      }

      for (const learnerId in learnersMap) {
        const learner = learnersMap[learnerId];
        learner.avg = learner.totalWeight !== 0 ? learner.totalWeightedScore / learner.totalWeight : learner.totalScore / learner.totalPossibleScore;
        delete learner.totalScore;
        delete learner.totalPossibleScore;
        delete learner.totalWeightedScore;
        delete learner.totalWeight;
      }

      return Object.values(learnersMap)

}



// Test and display results of the function with data provided and defined in 
// Course Info, AssignmentGroup and LearnerSubmissions objects
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);