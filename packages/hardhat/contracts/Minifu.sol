// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Minifu {
    /*
    Task here, is represented as way to earn on the frontend
    */

    // Represents a social media task with a URL, points, and total customers who have completed it.
    struct Task {
        string url;
        uint256 points;
        uint256 totalCustomers;
    }

    // Represents a loyalty program with a name, description, owner, task count, and a mapping of tasks.
    struct Program {
        string name;
        string description;
        address owner;
        uint256 tasksCount;
        mapping(uint256 => Task) tasks;
    }

    // Struct for returning program details
    struct ProgramInfo {
        string name;
        string description;
        address owner;
        uint256 tasksCount;
    }

    // Struct for returning task details
    struct TaskInfo {
        string url;
        uint256 points;
        uint256 totalCustomers;
    }

    // Tracks the number of programs created by each user
    mapping(address => uint256) public programCount;

    // Stores the programs created by each user
    mapping(address => mapping(uint256 => Program)) public programs;

    uint256 public totalProgramCount;
    mapping(uint256 => Program) public allPrograms;

    event ProgramCreated(
        address indexed owner,
        uint256 programId,
        string name,
        string description
    );
    event TaskAdded(
        address indexed owner,
        uint256 programId,
        uint256 taskId,
        string url,
        uint256 points
    );
    event TaskCompleted(
        address indexed user,
        uint256 programId,
        uint256 taskId
    );

    // Allows a user to set up a new program with a name and description
    function createProgram(
        string memory _name,
        string memory _description
    ) public {
        uint256 programId = programCount[msg.sender];
        Program storage newProgram = programs[msg.sender][programId];
        newProgram.name = _name;
        newProgram.description = _description;
        newProgram.owner = msg.sender;
        newProgram.tasksCount = 0;

        programCount[msg.sender]++;
        allPrograms[totalProgramCount].name = newProgram.name;
        allPrograms[totalProgramCount].description = newProgram.description;
        allPrograms[totalProgramCount].owner = newProgram.owner;
        allPrograms[totalProgramCount].tasksCount = newProgram.tasksCount;
        totalProgramCount++;

        emit ProgramCreated(msg.sender, programId, _name, _description);
    }

    // Allows a user to add a task to a program
    function addTask(
        uint256 _programId,
        string memory _url,
        uint256 _points
    ) public {
        require(_programId < programCount[msg.sender], "Invalid program ID");

        Program storage program = programs[msg.sender][_programId];
        require(program.owner == msg.sender, "Not the program owner");

        uint256 taskId = program.tasksCount;
        program.tasks[taskId] = Task({
            url: _url,
            points: _points,
            totalCustomers: 0
        });

        program.tasksCount++;

        emit TaskAdded(msg.sender, _programId, taskId, _url, _points);
    }

    function completeTask(
        address _programOwner,
        uint256 _programId,
        uint256 _taskId
    ) public {
        Program storage program = programs[_programOwner][_programId];
        require(program.owner == _programOwner, "Invalid program owner");
        require(_taskId < program.tasksCount, "Invalid task ID");

        Task storage task = program.tasks[_taskId];
        task.totalCustomers++;

        emit TaskCompleted(msg.sender, _programId, _taskId);
    }

    function getAllPrograms() public view returns (ProgramInfo[] memory) {
        ProgramInfo[] memory allProgramList = new ProgramInfo[](
            totalProgramCount
        );
        for (uint256 i = 0; i < totalProgramCount; i++) {
            Program storage program = allPrograms[i];
            allProgramList[i] = ProgramInfo({
                name: program.name,
                description: program.description,
                owner: program.owner,
                tasksCount: program.tasksCount
            });
        }
        return allProgramList;
    }

    function getProgramsByOwner(
        address _programOwner
    ) public view returns (ProgramInfo[] memory) {
        uint256 count = programCount[_programOwner];
        ProgramInfo[] memory userProgramList = new ProgramInfo[](count);
        for (uint256 i = 0; i < count; i++) {
            Program storage program = programs[_programOwner][i];
            userProgramList[i] = ProgramInfo({
                name: program.name,
                description: program.description,
                owner: program.owner,
                tasksCount: program.tasksCount
            });
        }
        return userProgramList;
    }

    function getProgram(
        address _programOwner,
        uint256 _programId
    )
        public
        view
        returns (
            string memory name,
            string memory description,
            uint256 tasksCount
        )
    {
        Program storage program = programs[_programOwner][_programId];
        return (program.name, program.description, program.tasksCount);
    }

    function getTask(
        address _programOwner,
        uint256 _programId,
        uint256 _taskId
    )
        public
        view
        returns (string memory url, uint256 points, uint256 totalCustomers)
    {
        Program storage program = programs[_programOwner][_programId];
        Task storage task = program.tasks[_taskId];
        return (task.url, task.points, task.totalCustomers);
    }

    // Returns the tasks associated with a program
    function getTasks(
        address _programOwner,
        uint256 _programId
    ) public view returns (TaskInfo[] memory) {
        Program storage program = programs[_programOwner][_programId];
        TaskInfo[] memory taskList = new TaskInfo[](program.tasksCount);
        for (uint256 i = 0; i < program.tasksCount; i++) {
            Task storage task = program.tasks[i];
            taskList[i] = TaskInfo({
                url: task.url,
                points: task.points,
                totalCustomers: task.totalCustomers
            });
        }
        return taskList;
    }
}