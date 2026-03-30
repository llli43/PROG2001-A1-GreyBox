using UnityEngine;

/// <summary>
/// 门控制器 - 交互后打开门
/// </summary>
public class DoorController : InteractableObject
{
    [SerializeField] private Vector3 openRotation = new Vector3(0, 90, 0);
    [SerializeField] private float openSpeed = 2f;
    
    private Quaternion closedRotation;
    private Quaternion targetRotation;
    private bool isOpen = false;
    
    void Start()
    {
        closedRotation = transform.rotation;
        targetRotation = closedRotation;
    }
    
    void Update()
    {
        // 平滑旋转到目标角度
        transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, Time.deltaTime * openSpeed);
    }
    
    protected override void PerformInteraction()
    {
        // 切换门的状态
        isOpen = !isOpen;
        
        if (isOpen)
        {
            targetRotation = Quaternion.Euler(openRotation) * closedRotation;
        }
        else
        {
            targetRotation = closedRotation;
        }
        
        Debug.Log($"门已{(isOpen ? "打开" : "关闭")}");
    }
}
