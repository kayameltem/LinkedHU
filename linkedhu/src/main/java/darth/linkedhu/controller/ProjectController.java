package darth.linkedhu.controller;

import darth.linkedhu.entity.Project;
import darth.linkedhu.entity.dtos.ProjectDto;
import darth.linkedhu.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    ProjectService projectService = new ProjectService();

    @PostMapping("/getProject")
    public Project getProject(@RequestBody ProjectDto projectDto) throws InterruptedException, ExecutionException {
        return projectService.get(projectDto.getProject());
    }

    @PostMapping("/createProject")
    public String createProject(@RequestBody ProjectDto projectDto) throws InterruptedException, ExecutionException {
        return projectService.save(projectDto.getProject());
    }

    @PostMapping("/updateProject")
    public String updateProject(@RequestBody ProjectDto projectDto) throws InterruptedException, ExecutionException {
        return projectService.update(projectDto.getProject());
    }

    @PostMapping("/deleteProject")
    public String deleteProject(@RequestBody ProjectDto projectDto){
        return projectService.delete(projectDto.getProject());
    }
}
