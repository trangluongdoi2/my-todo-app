const awsmobile = {
  configureAmplify: {
    Auth: {
      Cognito: {
        userPoolClientId: '6guseplka4ap84ds55a6bdbtd9',
        userPoolId: 'ap-southeast-1_h4AcbDbZI',
        // identityPoolId: 'ap-southeast-1:da59912b-d05a-4826-8501-79513dee31ba',
      },
    },
    // Storage: {
    //   S3: {
    //     bucket: 's3-todo-uploads',
    //     region: 'ap-southeast-1',
    //   }
    // }
  }
};

export default awsmobile;
