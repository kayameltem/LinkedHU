package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends User{

    @SerializedName("type")
    private UserType type = UserType.ADMIN;

}
