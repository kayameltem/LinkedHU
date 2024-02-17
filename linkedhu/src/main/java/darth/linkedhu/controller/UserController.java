package darth.linkedhu.controller;

import darth.linkedhu.entity.User;
import darth.linkedhu.entity.dtos.PasswordDto;
import darth.linkedhu.entity.dtos.ProfessionDto;
import darth.linkedhu.entity.dtos.SearchDto;
import darth.linkedhu.entity.dtos.UserDto;
import darth.linkedhu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.concurrent.ExecutionException;

@Controller
@RequestMapping("/user")
@ResponseBody
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public boolean signUp(@RequestBody UserDto userDto) throws InterruptedException, ExecutionException {
        return userService.signUp(userDto.getUser(),userDto.getType());
    }

    @PostMapping("/searchuser")
    public User searchUser(@RequestBody SearchDto mailDto) throws InterruptedException, ExecutionException {
        return userService.searchUser(mailDto.getMail());
    }

    @PostMapping("/login")
    public User login(@RequestBody UserDto userDto) throws InterruptedException, ExecutionException {
        return userService.login(userDto);
    }

    @PostMapping("/logout")
    public boolean logout(@RequestBody UserDto userDto) throws InterruptedException, ExecutionException, IllegalAccessException {
        return userService.logout(userDto);
    }

    @PostMapping("/forgotpassword")
    public boolean forgotPassword(@RequestBody PasswordDto passwordDto) throws InterruptedException, ExecutionException {
        return userService.forgotPassword(passwordDto);
    }

    @PostMapping("/editprofile")
    public User editProfile(@RequestBody UserDto userDto) throws InterruptedException, ExecutionException, IllegalAccessException {
        return userService.editProfile(userDto);
    }

    @PostMapping("/changepassword")
    public boolean changePassword(@RequestBody PasswordDto passwordDto) throws InterruptedException, ExecutionException{
        return userService.changePassword(passwordDto);
    }

    @PostMapping("/editprofession")
    public boolean editProfession(@RequestBody ProfessionDto professionDto) throws InterruptedException, ExecutionException, IllegalAccessException {
        return userService.editProfession(professionDto);
    }

    @PostMapping("/editcontact")
    public boolean editContact(@RequestBody UserDto userDto) throws InterruptedException, ExecutionException, IllegalAccessException {
        return userService.editContact(userDto);
    }

    @PostMapping("/deleteaccount")
    public boolean deleteAccount(@RequestBody UserDto userDto) throws InterruptedException, ExecutionException, IllegalAccessException {
        return userService.deleteAccount(userDto);
    }

    @PostMapping("/fetchUser")
    public User fetchUser(@RequestBody UserDto userDto) throws InterruptedException, ExecutionException, IllegalAccessException {
        return userService.fetchUser(userDto);
    }

    @PostMapping("/find")
    public ArrayList<User> find(@RequestParam String searchKey) throws InterruptedException, ExecutionException, IllegalAccessException {
        return userService.find(searchKey);
    }

}
