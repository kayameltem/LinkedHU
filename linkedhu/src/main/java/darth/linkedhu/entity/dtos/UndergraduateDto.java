package darth.linkedhu.entity.dtos;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.entity.Undergraduate;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UndergraduateDto {
    @SerializedName("Undergraduate")
    Undergraduate undergraduate;
}
