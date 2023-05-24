# rcli-ent
 react cli to generate boiler plate codes for the components

------------------------

### Usage:

1. Install it globally: ```npm install -g  rcli-ent``` / ```yarn add -g  rcli-ent```.
2. Run the below command in the terminal inside your React.JS project. <br/>
    Syntax: rct -c ComponentName <br/>
    Example: rct -c profile <br/>
    Sample output: <br/>
      &nbsp;&nbsp;&nbsp; Component profile/ProfileComponent.tsx created successfully <br/>
      &nbsp;&nbsp;&nbsp; Component profile/ProfileComponent.scss created successfully <br/>

----

### Available options

You can use bellow options to customise.

| Attribute    | Type    | Options           | Default Value | Description                                                                                                   | Example                           |
|--------------|---------|-------------------|---------------|---------------------------------------------------------------------------------------------------------------|-----------------------------------|
| --skipStyles | boolean | true, false       | false         | by default component created with style sheet. pass `false` to override                                       | ```rct -c profile --skipStyles``` |
| --type       | string  | functional, class | functional    | to generate functional or class component                                                                     | ```rct -c profile --type=class``` |
| --styles     | string  | scss, css         | scss          | to set style whether to use scss or css                                                                       | ```rct -c profile --styles=css``` |
| --camelCase  | boolean | true, false       | false         | to create component with camel casing                                                                         | ```rct -c profile --camelCase```  |


Note: Component path name could be nested folder path to create component in a nested folder. <br/>
Example:  ```rct -c src/profile/change-password``` <br/>
Output: <br/>
Component `src/profile/change-password/ChangePasswordComponent.tsx` created successfully. <br/>
Component `src/profile/change-password/ChangePasswordComponent.scss` created successfully. <br/> 

## License

MIT Licensed. Copyright (c) Manoj varma 2023.
