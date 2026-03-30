using UnityEngine;

/// <summary>
/// 玩家控制器
/// 处理玩家移动、跳跃和相机视角
/// </summary>
public class PlayerController : MonoBehaviour
{
    [Header("移动设置")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float rotationSpeed = 2f;
    
    [Header("跳跃设置")]
    [SerializeField] private float jumpForce = 8f;
    [SerializeField] private float groundCheckDistance = 0.6f;
    [SerializeField] private LayerMask groundLayer;
    
    [Header("相机设置")]
    [SerializeField] private Transform cameraTransform;
    [SerializeField] private float lookSensitivity = 2f;
    [SerializeField] private float maxLookAngle = 80f;
    
    private Rigidbody rb;
    private float verticalRotation = 0f;
    private float horizontalRotation = 0f;
    private bool isGrounded;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        
        // 锁定刚体的旋转，防止被撞飞
        rb.freezeRotation = true;
        
        // 如果没有指定相机，使用主相机
        if (cameraTransform == null)
        {
            cameraTransform = Camera.main.transform;
        }
        
        // 锁定鼠标光标
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }
    
    void Update()
    {
        CheckGrounded();
        HandleRotation();
        HandleMovement();
        HandleJump();
        
        // 按ESC键解锁鼠标
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
        }
    }
    
    /// <summary>
    /// 检测是否在地面上
    /// </summary>
    void CheckGrounded()
    {
        // 从玩家脚底位置发射射线检测地面
        Vector3 checkPos = transform.position + Vector3.down * 0.9f;
        isGrounded = Physics.Raycast(checkPos, Vector3.down, groundCheckDistance, groundLayer);
        
        // 备选：使用球形检测更可靠
        if (!isGrounded)
        {
            isGrounded = Physics.SphereCast(checkPos, 0.3f, Vector3.down, out _, 0.1f, groundLayer);
        }
    }
    
    /// <summary>
    /// 处理跳跃输入
    /// </summary>
    void HandleJump()
    {
        // 按空格键跳跃（必须在地面上）
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            // 重置垂直速度，确保跳跃高度一致
            Vector3 velocity = rb.velocity;
            velocity.y = 0;
            rb.velocity = velocity;
            
            // 应用跳跃力
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }
    
    /// <summary>
    /// 处理玩家旋转（鼠标视角）
    /// </summary>
    void HandleRotation()
    {
        // 获取鼠标输入
        float mouseX = Input.GetAxis("Mouse X") * lookSensitivity;
        float mouseY = Input.GetAxis("Mouse Y") * lookSensitivity;
        
        // 水平旋转（玩家身体）
        horizontalRotation += mouseX;
        transform.rotation = Quaternion.Euler(0f, horizontalRotation, 0f);
        
        // 垂直旋转（相机视角）
        verticalRotation -= mouseY;
        verticalRotation = Mathf.Clamp(verticalRotation, -maxLookAngle, maxLookAngle);
        cameraTransform.localRotation = Quaternion.Euler(verticalRotation, 0f, 0f);
    }
    
    /// <summary>
    /// 处理玩家移动
    /// </summary>
    void HandleMovement()
    {
        // 获取WASD输入
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        // 计算移动方向（相对于玩家朝向）
        Vector3 movement = transform.right * horizontal + transform.forward * vertical;
        movement = movement.normalized * moveSpeed;
        
        // 保持垂直速度（重力），只在水平方向移动
        movement.y = rb.velocity.y;
        
        // 应用移动
        rb.velocity = movement;
    }
    
    // 在编辑器中显示地面检测线
    void OnDrawGizmosSelected()
    {
        Gizmos.color = isGrounded ? Color.green : Color.red;
        Vector3 checkPos = transform.position + Vector3.down * 0.9f;
        Gizmos.DrawLine(checkPos, checkPos + Vector3.down * groundCheckDistance);
        Gizmos.DrawWireSphere(checkPos, 0.3f);
    }
    
    /// <summary>
    /// 公共方法：设置鼠标锁定状态
    /// </summary>
    public void SetCursorLock(bool locked)
    {
        if (locked)
        {
            Cursor.lockState = CursorLockMode.Locked;
            Cursor.visible = false;
        }
        else
        {
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
        }
    }
}
